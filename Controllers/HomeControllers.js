class HomeControllers
{
    home(req, res)
    {
         res.render('home');
    }

}

module.exports = new HomeControllers();