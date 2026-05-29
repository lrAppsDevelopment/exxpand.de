import LegalPageLayout from '../components/LegalPageLayout'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="font-sans font-bold text-lg text-ivory mb-3">{title}</h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }) {
  return (
    <div className="mt-4">
      <h3 className="font-sans font-semibold text-base text-ivory/90 mb-2">{title}</h3>
      {children}
    </div>
  )
}

export default function Impressum() {
  return (
    <LegalPageLayout title="Impressum">
      <Section title="Angaben gemäß § 5 TMG">
        <h3 className="font-sans font-semibold text-base text-ivory/90 mb-2">EXXPAND GmbH</h3>
        <p>
          Am Pfarranger 27<br />
          84036 Kumhausen
        </p>
        <p className="mt-3">
          Fon: +49 871 40 43 7318<br />
          Fax: +49 871 40 43 8061<br />
          <a href="https://www.exxpand.de" className="text-champagne hover:underline">www.exxpand.de</a>
          <br />
          <a href="mailto:Info@exxpand.de" className="text-champagne hover:underline">Info@exxpand.de</a>
          <br />
          Geschäftsführer: Dipl. Sales Manager (FH) Stephan Christ
        </p>
      </Section>

      <Section title="Registereintrag">
        <p>
          Eintragung im Handelsregister. Registergericht: Amtsgericht Landshut
          <br />
          Regsiternummer: HRB 10514
        </p>
      </Section>

      <Section title="Umsatzsteuer-ID:">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
          <br />
          DE 309414325
          <br />
          Finanzamt Landshut
        </p>
      </Section>

      <Section title="Haftungsausschluss (Disclaimer)">
        <SubSection title="Haftung für Inhalte">
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mt-3">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
        </SubSection>

        <SubSection title="Haftung für Links">
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          </p>
          <p className="mt-3">
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
        </SubSection>

        <SubSection title="Urheberrecht">
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p className="mt-3">
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </SubSection>
      </Section>
    </LegalPageLayout>
  )
}
