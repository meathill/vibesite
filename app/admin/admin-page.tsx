'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useAdminSubmissions } from '@/hooks/use-admin-submissions';
import { formatDateTime } from '@/lib/format';
import { STATUS_COLORS, STATUS_LABELS } from '@/lib/status-labels';
import type { SubmissionStatus } from '@/types';

export default function AdminPageContent() {
  const {
    submissions,
    total,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    isLoading,
    listError,
    selectedSubmission,
    selectSubmission,
    clearSelection,
    resultStatus,
    setResultStatus,
    temporaryUrl,
    setTemporaryUrl,
    permanentUrl,
    setPermanentUrl,
    errorMessage,
    setErrorMessage,
    adminNote,
    setAdminNote,
    isUpdating,
    updateError,
    updateResult,
  } = useAdminSubmissions();

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? '')}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="全部状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">全部状态</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">共 {total} 条记录</span>
      </div>

      {listError && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {listError}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="size-8" />
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>项目名称</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    暂无数据
                  </TableCell>
                </TableRow>
              ) : (
                submissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell>{item.project_name}</TableCell>
                    <TableCell>{item.contact}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[item.status]}>
                        {STATUS_LABELS[item.status]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateTime(item.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => selectSubmission(item)}>
                        查看
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            上一页
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            下一页
          </Button>
        </div>
      )}

      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => {
          if (!open) clearSelection();
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>提交详情</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">项目名称</p>
                  <p className="font-medium">{selectedSubmission.project_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">联系方式</p>
                  <p className="font-medium">{selectedSubmission.contact}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">用途</p>
                  <p className="font-medium">{selectedSubmission.intent ?? '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">创建时间</p>
                  <p className="font-medium">{formatDateTime(selectedSubmission.created_at)}</p>
                </div>
              </div>

              {selectedSubmission.description && (
                <div className="text-sm">
                  <p className="text-muted-foreground">描述</p>
                  <p>{selectedSubmission.description}</p>
                </div>
              )}

              {selectedSubmission.source_r2_key && (
                <div className="text-sm">
                  <p className="text-muted-foreground">文件</p>
                  <p className="font-mono text-xs">{selectedSubmission.source_r2_key}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="mb-3 font-semibold">更新状态</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label>状态</Label>
                    <Select
                      value={resultStatus}
                      onValueChange={(v) => setResultStatus((v ?? 'pending') as SubmissionStatus)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>预览链接</Label>
                    <Input
                      placeholder="https://xxx.pages.dev"
                      value={temporaryUrl}
                      onChange={(e) => setTemporaryUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>永久链接</Label>
                    <Input
                      placeholder="https://xxx.com"
                      value={permanentUrl}
                      onChange={(e) => setPermanentUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>错误信息</Label>
                    <Input
                      placeholder="部署失败时填写"
                      value={errorMessage}
                      onChange={(e) => setErrorMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label>管理员备注</Label>
                    <Textarea
                      placeholder="可选备注"
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={2}
                    />
                  </div>

                  {updateError && (
                    <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {updateError}
                    </div>
                  )}

                  <Button onClick={updateResult} disabled={isUpdating}>
                    {isUpdating ? '更新中...' : '更新'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
