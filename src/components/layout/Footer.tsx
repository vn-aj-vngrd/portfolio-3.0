import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer navigation">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
