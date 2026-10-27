import { useParams } from 'react-router'
import { findGroup, type Section } from '@/site/catalog'
import { ComponentPage } from './ComponentPage'
import { Gallery } from './Gallery'

/** /components/<x> ve /blocks/<x>: grup adıysa galeri, değilse öğe sayfası. */
export function Slug({ section }: { section: Section }) {
  const { slug = '' } = useParams()
  return findGroup(section, slug) ? <Gallery section={section} /> : <ComponentPage />
}
