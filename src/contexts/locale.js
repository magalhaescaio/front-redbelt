import React, { createContext, useEffect, useState } from 'react'
import i18n from './../locales/i18n'

const LocaleContext = createContext()

function LocaleProvider({children}) {
    const [savedLocale, saveLocale] = useState(localStorage.getItem('@redbelt-lang'))

    const updateLocale = (locale) => {
        saveLocale(locale)
        localStorage.setItem('@redbelt-lang', locale)

        i18n.changeLanguage(locale)
    }
  

    useEffect(() => {
        if(!localStorage.getItem('@redbelt-lang')){
            localStorage.setItem('@redbelt-lang', 'pt')
        }
        i18n.changeLanguage(savedLocale)
    }, [savedLocale])


    return (
        <LocaleContext.Provider
            value={{
                savedLocale,
                updateLocale
            }}
        >
        {children}
        </LocaleContext.Provider>
    )
}

export { LocaleProvider, LocaleContext as default }
