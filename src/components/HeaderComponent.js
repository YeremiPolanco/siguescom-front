import React from "react";

export const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        {/* Reemplaza el texto "SIGESCOM" con la imagen */}
                        <a href='/' className='navbar-brand'>
                            SIGESCOM
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
};