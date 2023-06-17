import React from 'react'
import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className="notFound">
            <div >The address {window.location.href} doesn't exist.</div>
            <div> please use one of the links on the top left to reach a viable page.</div>
        </div>
    )
}

export default NotFoundPage