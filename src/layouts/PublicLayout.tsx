import { lazy, Suspense, type ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import site from '../config/site';

// 페이지 lazy import
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Auth 페이지
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const MyPage = lazy(() => import('../pages/MyPage'));

// Shop 페이지
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'));
const OrderHistory = lazy(() => import('../pages/OrderHistory'));

// KDN 바이브코딩 교육 페이지
const Curriculum = lazy(() => import('../pages/Curriculum'));
const CurriculumBasic = lazy(() => import('../pages/CurriculumBasic'));
const CurriculumIntermediate = lazy(() => import('../pages/CurriculumIntermediate'));
const CurriculumAdvanced = lazy(() => import('../pages/CurriculumAdvanced'));
const Lecture = lazy(() => import('../pages/Lecture'));
const LectureSetup = lazy(() => import('../pages/LectureSetup'));
const LectureBasic = lazy(() => import('../pages/LectureBasic'));
const LectureIntermediate = lazy(() => import('../pages/LectureIntermediate'));
const LectureAdvanced = lazy(() => import('../pages/LectureAdvanced'));
const PromptEvalHub = lazy(() => import('../pages/prompt-eval/PromptEvalHub'));
const PromptWorkshop = lazy(() => import('../pages/prompt-eval/PromptWorkshop'));
const PromptPractice = lazy(() => import('../pages/prompt-eval/PromptPractice'));
const Practice = lazy(() => import('../pages/Practice'));
const PromptCases = lazy(() => import('../pages/PromptCases'));
const VibePractice = lazy(() => import('../pages/VibePractice'));
const RecommendedSites = lazy(() => import('../pages/RecommendedSites'));
const AboutPage = lazy(() => import('../pages/About'));
const CompanyIntro = lazy(() => import('../pages/CompanyIntro'));
const InstructorIntro = lazy(() => import('../pages/InstructorIntro'));

// Claude Code 교육 페이지
const ClaudeCodeIntro = lazy(() => import('../pages/claude-code/ClaudeCodeIntro'));
const ClaudeCodeMarkdown = lazy(() => import('../pages/claude-code/ClaudeCodeMarkdown'));
const ClaudeCodeSkills = lazy(() => import('../pages/claude-code/ClaudeCodeSkills'));
const ClaudeCodeAdvanced = lazy(() => import('../pages/claude-code/ClaudeCodeAdvanced'));

const Loading = (): ReactElement => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <div className="loading-spinner"></div>
  </div>
);

const PublicLayout = (): ReactElement => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            {site.features.auth && (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/mypage" element={<AuthGuard><MyPage /></AuthGuard>} />
                <Route path="/mypage/orders" element={<AuthGuard><OrderHistory /></AuthGuard>} />
              </>
            )}

            {/* Shop */}
            {site.features.shop && (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
              </>
            )}

            {/* 커리큘럼 */}
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/curriculum/basic" element={<CurriculumBasic />} />
            <Route path="/curriculum/intermediate" element={<CurriculumIntermediate />} />
            <Route path="/curriculum/advanced" element={<CurriculumAdvanced />} />

            {/* 강의안 */}
            <Route path="/lecture" element={<Lecture />} />
            <Route path="/lecture/setup" element={<LectureSetup />} />
            <Route path="/lecture/basic" element={<LectureBasic />} />
            <Route path="/lecture/intermediate" element={<LectureIntermediate />} />
            <Route path="/lecture/advanced" element={<LectureAdvanced />} />

            {/* Claude Code */}
            <Route path="/claude-code" element={<ClaudeCodeIntro />} />
            <Route path="/claude-code/intro" element={<ClaudeCodeIntro />} />
            <Route path="/claude-code/markdown" element={<ClaudeCodeMarkdown />} />
            <Route path="/claude-code/skills" element={<ClaudeCodeSkills />} />
            <Route path="/claude-code/advanced" element={<ClaudeCodeAdvanced />} />

            {/* 프롬프트 실습 (university 포팅) */}
            <Route path="/prompt-eval" element={<PromptEvalHub />} />
            <Route path="/prompt-eval/workshop" element={<PromptWorkshop />} />
            <Route path="/prompt-eval/practice" element={<PromptPractice />} />

            {/* AI 실습 (ChatGPT) */}
            <Route path="/practice" element={<Practice />} />

            {/* 업무용 프롬프트 사례 */}
            <Route path="/prompt-cases" element={<PromptCases />} />

            {/* 바이브코딩 실습 */}
            <Route path="/vibe-practice" element={<VibePractice />} />

            {/* About */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/company" element={<CompanyIntro />} />
            <Route path="/about/instructor" element={<InstructorIntro />} />

            {/* 추천사이트 */}
            <Route path="/recommended" element={<RecommendedSites />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
