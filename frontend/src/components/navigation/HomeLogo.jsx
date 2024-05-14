import React from "react"

const HomeLogo = () => {

    return (
        <>
        {/* Logos */}
        <a href="/" className='inline-flex shrink-0'>
        <img src="./assets/logo/logo-graphic.svg" alt="logo graphic" className="py-2 pr-2 h-12"/>
        <img src="./assets/logo/logo-name.svg" alt="logo name" className="py-3 h-12 md:hidden"/>
        </a>
        </>
    )
}

export default HomeLogo