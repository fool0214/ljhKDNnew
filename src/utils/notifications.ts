/**
 * notifications.ts
 * 이메일 & SMS 발송 공용 유틸리티
 *
 * 공용 Supabase Edge Functions 호출 (모든 dreamitbiz.com 사이트에서 사용 가능)
 *   - send-email : Resend API (noreply@dreamitbiz.com 발신)
 *   - send-sms   : icode TCP SMS (등록된 발신번호)
 *
 * 사용 예시:
 *   import { sendEmail, sendSMS, sendBoth } from '../utils/notifications';
 *
 *   await sendEmail({ to: 'user@example.com', subject: '제목', html: '<p>내용</p>' });
 *   await sendSMS({ receiver: '01012345678', message: '안녕하세요' });
 */

import getSupabase from './supabase';

// ── 타입 정의 ────────────────────────────────────────────────

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
  type?: string; // 선택적 메시지 타입 (로깅용)
}

export interface SMSParams {
  receiver: string; // 수신번호 (하이픈 포함 가능 — 자동 제거됨)
  message: string;  // 메시지 내용 (90바이트 초과 시 LMS 자동 전환)
}

export interface NotificationResult {
  success: boolean;
  error?: string;
}

// ── 이메일 발송 ──────────────────────────────────────────────

/**
 * Resend API를 통해 이메일 발송
 * 발신 주소: noreply@dreamitbiz.com
 */
export async function sendEmail(params: EmailParams): Promise<NotificationResult> {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase 초기화 실패' };

  try {
    const { data, error } = await sb.functions.invoke('send-email', { body: params });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[notifications] sendEmail 오류:', msg);
    return { success: false, error: msg };
  }
}

// ── SMS 발송 ─────────────────────────────────────────────────

/**
 * icode TCP를 통해 SMS/LMS 발송
 * 90바이트(EUC-KR 기준) 초과 시 자동으로 LMS 전환
 */
export async function sendSMS(params: SMSParams): Promise<NotificationResult> {
  const sb = getSupabase();
  if (!sb) return { success: false, error: 'Supabase 초기화 실패' };

  try {
    const { data, error } = await sb.functions.invoke('send-sms', { body: params });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    if (!data?.success) throw new Error(data?.message || 'SMS 발송 실패');
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[notifications] sendSMS 오류:', msg);
    return { success: false, error: msg };
  }
}

// ── 이메일 + SMS 동시 발송 ───────────────────────────────────

/**
 * 이메일과 SMS를 동시에 발송 (Promise.allSettled — 한쪽 실패해도 다른쪽 진행)
 */
export async function sendBoth(params: {
  email: EmailParams;
  sms: SMSParams;
}): Promise<{ email: NotificationResult; sms: NotificationResult }> {
  const [emailResult, smsResult] = await Promise.allSettled([
    sendEmail(params.email),
    sendSMS(params.sms),
  ]);

  return {
    email: emailResult.status === 'fulfilled'
      ? emailResult.value
      : { success: false, error: emailResult.reason?.message },
    sms: smsResult.status === 'fulfilled'
      ? smsResult.value
      : { success: false, error: smsResult.reason?.message },
  };
}

// ── 이메일 템플릿 헬퍼 ───────────────────────────────────────

/**
 * 기본 이메일 HTML 래퍼 (브랜드 일관성 유지)
 */
export function buildEmailHtml(params: {
  title: string;
  body: string;
  siteName?: string;
  siteUrl?: string;
  primaryColor?: string;
}): string {
  const {
    title,
    body,
    siteName = 'DreamIT',
    siteUrl = 'https://www.dreamitbiz.com',
    primaryColor = '#106bb5',
  } = params;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Apple SD Gothic Neo',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
        <!-- 헤더 -->
        <tr>
          <td style="background:${primaryColor};padding:24px 32px;">
            <a href="${siteUrl}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none;">${siteName}</a>
          </td>
        </tr>
        <!-- 본문 -->
        <tr>
          <td style="padding:32px;color:#333;font-size:15px;line-height:1.7;">
            <h2 style="margin:0 0 20px;font-size:18px;color:#111;">${title}</h2>
            ${body}
          </td>
        </tr>
        <!-- 푸터 -->
        <tr>
          <td style="padding:20px 32px;background:#f9f9f9;border-top:1px solid #eee;font-size:12px;color:#999;text-align:center;">
            본 메일은 발신 전용입니다. 문의: <a href="mailto:admin@dreamitbiz.com" style="color:${primaryColor};">admin@dreamitbiz.com</a><br>
            © ${new Date().getFullYear()} DreamIT. All rights reserved.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
