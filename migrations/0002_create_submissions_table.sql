-- Migration: Create submissions table
-- Created: 2026-06-23

CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(8)))),
  project_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  description TEXT,
  intent TEXT CHECK(intent IN ('preview', 'hosting', 'custom_domain', 'human_service')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'processing', 'deployed', 'failed', 'expired')),
  source_r2_key TEXT,
  temporary_url TEXT,
  permanent_url TEXT,
  error_message TEXT,
  admin_note TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
