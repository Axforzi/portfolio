import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="not-found container">
      <p className="not-found-code">404</p>
      <h1>{t('notFound.title')}</h1>
      <p className="not-found-text">{t('notFound.body')}</p>
      <Link to="/" className="btn btn-primary">{t('notFound.back')}</Link>
    </section>
  )
}
