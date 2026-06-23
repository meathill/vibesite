-- 测试数据
INSERT INTO submissions (id, project_name, contact, description, intent, status, created_at, updated_at)
VALUES
  ('test001', '我的第一个网站', 'test@example.com', '用 Cursor 生成的个人主页', 'preview', 'pending', datetime('now', '-2 hours'), datetime('now', '-2 hours')),
  ('test002', '电商落地页', 'user@wechat.com', 'Lovable 生成的产品展示页', 'hosting', 'processing', datetime('now', '-1 hour'), datetime('now', '-30 minutes')),
  ('test003', '作品集', 'artist@telegram', 'Bolt 生成的设计师作品集', 'custom_domain', 'deployed', datetime('now', '-3 hours'), datetime('now', '-1 hour')),
  ('test004', '活动页面', 'event@example.com', 'v0 生成的活动报名页', 'preview', 'failed', datetime('now', '-4 hours'), datetime('now', '-3 hours'));
