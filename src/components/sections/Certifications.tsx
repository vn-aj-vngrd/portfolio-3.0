import { Chip } from "@/components/ui/Chip";
import { certifications } from "@/content/certifications";

export function Certifications() {
  const featured = certifications.find((item) => item.featured);
  const credentials = certifications.filter((item) => !item.featured);

  return (
    <section
      className="section certifications-section"
      id="credentials"
      data-tour-stop="credentials"
      aria-labelledby="certifications-title"
    >
      <div className="section-heading section-heading-wide" data-reveal>
        <div className="section-index">
          <span>04</span>
          <span>Credentials</span>
        </div>
        <h2 id="certifications-title">
          Education, awards, and technical training.
        </h2>
        <p>
          BS Information Technology, University of San Carlos, 2024, with{" "}
          <Chip icon="award">Hackfest finalist</Chip>,{" "}
          <Chip icon="grad">internship awards</Chip>, and{" "}
          <Chip icon="check">technical training</Chip>.
        </p>
      </div>

      <div className="credentials-layout">
        {featured ? (
          <article className="featured-credential" data-reveal>
            <div className="credential-brand">
              <svg
                viewBox="0 0 64 32"
                aria-hidden="true"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 6 5 16" stroke="#4285f4" />
                <path d="M5 16l14 10" stroke="#34a853" />
                <path d="M45 6l14 10" stroke="#ea4335" />
                <path d="M59 16 45 26" stroke="#fbbc04" />
              </svg>
              <span>Google Developer Student Club</span>
            </div>
            <div className="credential-mark" aria-hidden="true">
              <span>HF</span>
              <small>2024</small>
            </div>
            <div className="credential-body">
              <p>{featured.kind}</p>
              <h3>{featured.title}</h3>
              <span>{featured.issuer}</span>
            </div>
            <span className="credential-bar" aria-hidden="true">
              {[0, 1, 2, 3].map((index) => (
                <i
                  data-fill
                  key={index}
                  style={{ "--i": index } as React.CSSProperties}
                />
              ))}
            </span>
          </article>
        ) : null}

        <ol className="credential-list" data-reveal="list">
          {credentials.map((credential, index) => (
            <li key={credential.title}>
              <span className="credential-number">0{index + 1}</span>
              <div>
                <p>{credential.kind}</p>
                <h3>{credential.title}</h3>
                <span>{credential.issuer}</span>
              </div>
              {credential.href ? (
                <a
                  href={credential.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${credential.title}`}
                >
                  View ↗
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
