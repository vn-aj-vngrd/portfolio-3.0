import { certifications } from "@/content/certifications";

export function Certifications() {
  const featured = certifications.find((item) => item.featured);
  const credentials = certifications.filter((item) => !item.featured);

  return (
    <section
      className="section certifications-section"
      id="credentials"
      aria-labelledby="certifications-title"
      data-reveal
    >
      <div className="section-heading section-heading-wide">
        <div className="section-index">
          <span>04</span>
          <span>Credentials</span>
        </div>
        <h2 id="certifications-title">Education, awards, and technical training.</h2>
        <p>
          I graduated with a BS in Information Technology from the University of
          San Carlos in 2024. This section also includes my Hackfest finalist
          recognition, internship awards, and completed technical programs.
        </p>
      </div>

      <div className="credentials-layout">
        {featured ? (
          <article className="featured-credential">
            <div className="credential-mark" aria-hidden="true">
              <span>HF</span>
              <small>2024</small>
            </div>
            <div>
              <p>{featured.kind}</p>
              <h3>{featured.title}</h3>
              <span>{featured.issuer}</span>
            </div>
          </article>
        ) : null}

        <ol className="credential-list">
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
