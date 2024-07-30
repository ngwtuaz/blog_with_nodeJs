class SiteController {
    index(req, res) {
        res.render('home');
    }

    about(req, res) {
        res.render('about');
    }

    search(req, res) {
        res.render('search');
    }
}

export default new SiteController();
