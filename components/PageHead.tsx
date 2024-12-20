import Head from 'next/head'

import type * as types from '@/lib/types'
import * as config from '@/lib/config'

import { StructuredDataForSEO } from './StructuredDataForSEO'

export function PageHead({
  site,
  title,
  description,
  url,
  isBlogPost
}: types.PageProps & {
  title?: string
  description?: string
  image?: string
  url?: string
  isBlogPost?: boolean
}) {
  const rssFeedUrl = `${config.host}/feed`

  title = title ?? site?.name
  description = description ?? site?.description

  // FIXME: Social sharing images seem to be broken
  const socialImageUrl = `${config.host}/social-sharing-image.png`

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover'
      />

      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='black' />

      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#fefffe'
        key='theme-color-light'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#2d3439'
        key='theme-color-dark'
      />

      <meta name='robots' content='index,follow' />
      <meta property='og:type' content='website' />

      {site && (
        <>
          <meta property='og:site_name' content={site.name} />
          <meta property='twitter:domain' content={site.domain} />
        </>
      )}

      {config.twitter && (
        <meta name='twitter:creator' content={`@${config.twitter}`} />
      )}

      {description && (
        <>
          <meta name='description' content={description} />
          <meta property='og:description' content={description} />
          <meta name='twitter:description' content={description} />
        </>
      )}

      {socialImageUrl ? (
        <>
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:image' content={socialImageUrl} />
          <meta property='og:image' content={socialImageUrl} />
        </>
      ) : (
        <meta name='twitter:card' content='summary' />
      )}

      {url && (
        <>
          <link rel='canonical' href={url} />
          <meta property='og:url' content={url} />
          <meta property='twitter:url' content={url} />
        </>
      )}

      <link
        rel='alternate'
        type='application/rss+xml'
        href={rssFeedUrl}
        title={site?.name}
      />

      <meta property='og:title' content={title} />
      <meta name='twitter:title' content={title} />
      <title>{title}</title>
      <StructuredDataForSEO/>
      { isBlogPost && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": url,
            url,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://${config.domain}#webpage`,
              "url": `https://${config.domain}`,
              "name": config.name,
              "description": config.description,
              "inLanguage": {
                "@type": "Language",
                "alternateName": config.language
              }
            },
            "headline": title,
            description,
            "image": socialImageUrl,
            "author": {
              "@type": "Person",
              // TODO: Google rich search results page is mentioning about this
              // Maybe site config could contain author url?
              // "url": ""
              "name": config.author,
            }
            // TODO: Figure out how to pull these from the Notion content
            //"datePublished": "2024-11-08",
            //"dateModified": "2024-11-08",
            //"articleBody": "..."
          })}
        </script>
      )}
    </Head>
  )
}
