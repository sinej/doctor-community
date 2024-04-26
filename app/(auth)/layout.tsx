'use client'

interface Props {
    children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
    const { children } = props;
    return (
        <>
            <div className="max-w-screen-md w-full mx-auto px-6">
                {children}
            </div>
        </>
    );
}

export default AuthLayout;