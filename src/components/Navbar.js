import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <nav class="col-md-1 d-md-block sidebar fixed-top custom-navbar rounded-navbar">
                    <div class="position-sticky">
                        <ul class="nav white-text flex-column">
                            {/* Add your logo image here */}
                            <li className="nav-item logo">
                                <img src="" alt="Your Logo" />
                            </li>
                            <li class="nav-item navMargin ">
                                <a class="nav-link active " style={{ color: 'white' }} href="Dashboard">Dashboard</a>
                            </li>
                            <li class="nav-item navMargin">
                                <a class="nav-link" style={{ color: 'white' }} href="">Inventory</a>
                            </li>
                            <li class="nav-item navMargin">
                                <a class="nav-link" style={{ color: 'white' }} href="Purchase">Purchase</a>
                            </li>
                            <li class="nav-item navMargin">
                                <a class="nav-link" style={{ color: 'white' }} href="Sale">Sale</a>
                            </li>
                            <li class="nav-item navMargin">
                                <a class="nav-link" style={{ color: 'white' }} href="History">History</a>
                            </li>
                            <li class="nav-item navMargin">
                                <Link class="nav-link" style={{ color: 'white' }} to="">Report</Link>
                            </li>
                            <li class="nav-item navbar-last-item">
                                <a class="nav-link" style={{ color: 'white' }} href="Logout">Log out</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Outlet />
            </div>
        </div>



    );
}

export default Navbar;