import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import type { ReactElement } from 'react';

const NotFound = (): ReactElement => {
  return (
    <>
      <SEOHead title="404 - 페이지를 찾을 수 없습니다" />
      <section className="not-found-page">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">페이지를 찾을 수 없습니다</h2>
          <p className="not-found-desc">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-btn primary">홈으로 돌아가기</Link>
            <Link to="/contact" className="not-found-btn secondary">문의하기</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
