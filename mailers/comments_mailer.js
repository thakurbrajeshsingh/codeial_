const queue = require('../config/kue');
const nodeMailer = require('../config/nodemailer');


exports.newComment = (comment)=>{
   let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_Comments.ejs');

    nodeMailer.transporter.sendMail({
    from: 'brajeshkumar7250211016@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: 'New Comment Published', // Subject line
    html: htmlString, // html body
    },(err,info)=>{
        if(err){console.log('Error in sending Mail'); return }
        // if(info){console.log('Mail Sent Successfully');
         return;
    })
}