import React from 'react';

interface Props {
    children: React.ReactNode;
}

const BgWrapper = (props: Props) => {
    const { children } = props;
    return (
        <>
            <div className="max-w-screen-md w-full mx-auto">
                {children}
            </div>
        </>
    );
}

export default BgWrapper;