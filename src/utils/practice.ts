import getSupabase from './supabase';

const TABLE = 'kdn_prompt_scores';

/** 점수 저장 */
export async function saveScore({ userId, userName, quizScore, evalScore, writeScore, totalScore, grade, detail }: {
  userId: string;
  userName: string;
  quizScore: number;
  evalScore: number;
  writeScore: number;
  totalScore: number;
  grade: string;
  detail: any;
}) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase not initialized');
  const { data, error } = await supabase.from(TABLE).insert({
    user_id: userId,
    user_name: userName,
    quiz_score: quizScore,
    eval_score: evalScore,
    write_score: writeScore,
    total_score: totalScore,
    grade,
    detail,
  }).select().single();
  if (error) throw error;
  return data;
}

/** 사용자 이력 조회 (최근 10건) */
export async function getHistory(userId: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error('Supabase not initialized');
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw error;
  return data || [];
}

/** 등급 계산 */
export function calcGrade(total: number) {
  if (total >= 225) return 'S';
  if (total >= 200) return 'A';
  if (total >= 175) return 'B';
  if (total >= 150) return 'C';
  return 'D';
}
