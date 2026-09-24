function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer>
            <p>
            {currentYear} © Vite Contributors. All rights reserved.
            </p>
        </footer>
    }