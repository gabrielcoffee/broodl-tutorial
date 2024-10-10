"use client";

import React, { useState } from 'react'

export default function CookieCounter() {

  const [cookies, setCookies] = useState(3)

  const removeCookies = () => setCookies(cookies - 1);
  const addCookies = () => setCookies(cookies + 1);

  return (
    <div>
      <p>Cookies in the jar: {cookies}</p>
      <button onClick={removeCookies}> Cookie</button>
      <button onClick={addCookies}>add Cookie</button>
    </div>
  )
}
