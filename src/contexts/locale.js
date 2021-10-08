import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from './../hooks/useLocalStorage'
import i18n from './../locales/i18n'

const LocaleContext = createContext()

function LocaleProvider({children}) {
    const [savedLocale, saveLocale] = useLocalStorage('redbelt-lang',"pt")

    const updateLocale = locale => saveLocale(locale)


    useEffect(() => {
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
