const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function (req, res) {
    //     Post.find({}, function(err,posts){
    //         return res.render('home',{
    //             title : 'Codeial | Home',
    //             posts: posts
    //         });
    //     });


    try {
        //populate user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');

        let users = await User.find({});

        return res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log('Error',err);
        return;
    }


}

//module.exports.actionName = function(req,res){}


//using then
// Post.find({}).populate('comments').then(function());

//promise
// let posts = Post.find({}).populate('comments').exec();

// posts.then();