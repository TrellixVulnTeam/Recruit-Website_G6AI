
const Jobs = require('../Models/Jobs')
const {mutipleMongooseToObject, singleToObject} = require('../src/util/mongoose')

class JobControllers
{
   


  home(req, res, next) {
    
    
    return req.body.keyword ?
    ( 
      Jobs.find({keyword:/req.body.keyword/, location:req.body.location})
      .then(Jobs=>{
        res.render('search/jobs',{Jobs: mutipleMongooseToObject(Jobs),username: req.user.name});
      })
      .catch(next)
    ) : 
    (
      Jobs.find({ location:req.body.location})
      .then(Jobs=>{
        res.render('search/jobs',{Jobs: mutipleMongooseToObject(Jobs),username: req.user.name});
      })
      .catch(next)
    )

  
    }



    detail(req, res, next)
    {
      Jobs.findById({_id: req.params.id})
        .then(Job=>{
          res.render('search/detail',{Job: singleToObject(Job),username: req.user.name});
        })
      
    }

    
    apply(req, res, next)
    {
      Jobs.findOne({_id: req.params.id})
        .then(Job => {
            res.render('search/apply',{Job: singleToObject(Job),username: req.user.name});
        })

          
      
    }

    applied(req,res)
    {
      
        Jobs.updateOne(
          {_id : req.params.id},
          {
            $push: {
              user_apply:{
                userEmail : req.body.userEmail,
                userNumber : req.body.userNumber,
                userLinkCV: req.body.linkCV
              }
            }
          }, 
          (err,result)=>{
            if(err){
              console.log(err);
              res.status(400).send('Error')
            }else{
              res.status(200).send(result);
            }
          }
        );
    }



    post(req, res)
    {
      res.render('search/post',{username: req.user.name});
    }


    stored(req, res)
    {
      const job = req.body
      const jobs = new Jobs(job);
      jobs.save()
      res.redirect("/search/jobs");
    }


}

module.exports = new JobControllers();