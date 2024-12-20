import type * as types from 'notion-types'
import cs from 'classnames'
import * as React from 'react'
import { IoMoonSharp, IoSunnyOutline } from 'react-icons/io5'
import { Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import { StaticLogo } from './StaticLogo'
import styles from './styles.module.css'

function ToggleThemeButton() {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <button
      type="button"
      className={cs('breadcrumb', 'button', styles.toggleDarkMode, !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
    </button>
  )
}

export function NotionPageHeader({
  block
}: {
  block: types.CollectionViewPageBlock | types.PageBlock
}) {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <div className="notion-nav-header-rhs breadcrumbs">
          <StaticLogo />
        </div>
        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={`nav-${link.pageId}-${link.title}`}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              }
              return (
                <components.Link
                  href={link.url}
                  key={`nav-${link.url}-${link.title}`}
                  className={cs(styles.navLink, 'breadcrumb', 'button')}
                >
                  {link.title}
                </components.Link>
              )
            })
            .filter(Boolean)}

          <ToggleThemeButton />

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
