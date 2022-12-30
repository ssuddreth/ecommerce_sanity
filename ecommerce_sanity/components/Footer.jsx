import React from 'react';
import { AiFillInstagram, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';
import { BsSpotify } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Fear Until Fury All rights reserverd</p>
      <p className="icons">
        <a className='social-links' href='https://www.instagram.com/fearuntilfury/' target='_blank'><AiFillInstagram /></a>
        <a className='social-links' href='https://www.facebook.com/fearuntilfury/' target='_blank'><AiFillFacebook /></a>
        <a className='social-links' href='https://www.youtube.com/c/FearUntilFury' target='_blank'><AiFillYoutube /></a>
        <a className='social-links' href='https://open.spotify.com/artist/2GTyFGo1MgTrbORh3Qt5HA' target='_blank'><BsSpotify /></a>
        <a className='social-links' href='https://music.apple.com/us/artist/fear-until-fury/1220578778' target='_blank'><SiApplemusic /></a>
      </p>
    </div>
  )
}

export default Footer