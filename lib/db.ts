import type { Submission, SubmissionStatus } from '@/types';

interface CreateSubmissionParams {
  project_name: string;
  contact: string;
  description?: string;
  intent?: string;
  source_r2_key?: string;
}

interface UpdateSubmissionParams {
  status?: SubmissionStatus;
  temporary_url?: string;
  permanent_url?: string;
  error_message?: string;
  admin_note?: string;
}

interface GetSubmissionsParams {
  page?: number;
  limit?: number;
  status?: SubmissionStatus;
}

export function createSubmission(
  db: D1Database,
  params: CreateSubmissionParams,
): Promise<D1Result> {
  return db
    .prepare(
      `INSERT INTO submissions (project_name, contact, description, intent, source_r2_key)
       VALUES (?1, ?2, ?3, ?4, ?5)`,
    )
    .bind(
      params.project_name,
      params.contact,
      params.description ?? null,
      params.intent ?? null,
      params.source_r2_key ?? null,
    )
    .run();
}

export async function getSubmission(db: D1Database, id: string): Promise<Submission | null> {
  const result = await db
    .prepare('SELECT * FROM submissions WHERE id = ?1')
    .bind(id)
    .first<Submission>();
  return result ?? null;
}

export function updateSubmission(
  db: D1Database,
  id: string,
  params: UpdateSubmissionParams,
): Promise<D1Result> {
  const sets: string[] = ["updated_at = datetime('now')"];
  const values: unknown[] = [];
  let idx = 1;

  if (params.status !== undefined) {
    sets.push(`status = ?${idx++}`);
    values.push(params.status);
  }
  if (params.temporary_url !== undefined) {
    sets.push(`temporary_url = ?${idx++}`);
    values.push(params.temporary_url);
  }
  if (params.permanent_url !== undefined) {
    sets.push(`permanent_url = ?${idx++}`);
    values.push(params.permanent_url);
  }
  if (params.error_message !== undefined) {
    sets.push(`error_message = ?${idx++}`);
    values.push(params.error_message);
  }
  if (params.admin_note !== undefined) {
    sets.push(`admin_note = ?${idx++}`);
    values.push(params.admin_note);
  }

  values.push(id);

  return db
    .prepare(`UPDATE submissions SET ${sets.join(', ')} WHERE id = ?${idx}`)
    .bind(...values)
    .run();
}

export async function getSubmissions(
  db: D1Database,
  params: GetSubmissionsParams = {},
): Promise<{ submissions: Submission[]; total: number }> {
  const { page = 1, limit = 20, status } = params;
  const offset = (page - 1) * limit;

  const whereClause = status ? 'WHERE status = ?1' : '';
  const countBind = status ? [status] : [];
  const listBind = status ? [status, limit, offset] : [limit, offset];

  const countIdx = status ? 2 : 1;
  const offsetIdx = status ? 3 : 2;

  const countQuery = `SELECT COUNT(*) as total FROM submissions ${whereClause}`;
  const listQuery = `SELECT * FROM submissions ${whereClause} ORDER BY created_at DESC LIMIT ?${countIdx} OFFSET ?${offsetIdx}`;

  const [countResult, listResult] = await db.batch([
    db.prepare(countQuery).bind(...countBind),
    db.prepare(listQuery).bind(...listBind),
  ]);

  const total = (countResult.results?.[0] as unknown as { total: number })?.total ?? 0;
  const submissions = (listResult.results as unknown as Submission[]) ?? [];

  return { submissions, total };
}
