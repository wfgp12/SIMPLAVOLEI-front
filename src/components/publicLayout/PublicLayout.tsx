import React from 'react';
import './PublicLayout.scss'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='PublicLayout'>
            <div className='PublicLayout__logo'>
                <img src='./../../assets/Logo.png' alt='Logo'/>
            </div>
            <div className='PublicLayout__content'>
                {children}
            </div>
        </div>
    )
}

export default PublicLayout