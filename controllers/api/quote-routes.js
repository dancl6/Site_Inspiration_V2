const router = require('express').Router();
const { Quotes, User, User_Quotes, Reason } = require('../../models');



router.post('/emotion', (req,res) => {
    console.log("emotion reason is 1:", req.body)
    Quotes.findAll({
        // attributes: ['id', 'category_name'],
        include: [
        {
            model: Reason
        },
        {
            model: User,
            attributes: { exclude: ['password']},
        }
    ]      
    })
    .then(dbQuotesData => {
        let test = JSON.parse(JSON.stringify(dbQuotesData))
        console.log("emotion reason is:", req.body.testing)
        console.log(" parsed quotes is:", test)  
        console.log("single quotes is:", test[0].reason.reason_tag)
        let quotesArrayReason = []
        for (let i = 0; i < test.length; i++) {
            if(test[i].reason.reason_tag === req.body.testing) {
                quotesArrayReason.push(test[i])
            }
        }
        console.log("quotes array reason is:", quotesArrayReason)
        //   res.json(quotesArrayReason)
        res.render('quote2', {
            // loggedIn: loginStatus,
            quotesArrayReason
        })
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      })
})


//GET all quotes
router.get('/', (req, res) => {
    Quotes.findAll({
        // attributes: ['id', 'category_name'],
        include: [
        {
            model: Reason
        },
        {
            model: User,
            attributes: { exclude: ['password']},
        }
    ]
    
        
    })
    .then(dbQuotesData => {
    //   let test = JSON.parse(JSON.stringify(dbQuotesData))
    //   console.log(" parsed quotes is:", test)  
    //   console.log("single quotes is:", test[0].reason.reason_tag)
    //   let quotesArrayReason = []
    //   for (let i = 0; i < test.length; i++) {
    //       if(test[i].reason.reason_tag === 1) {

    //       }
    //   }
        res.json(dbQuotesData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//GET single quote
router.get('/:id', (req, res) => {
    Quotes.findOne({
        where: {
            id: req.params.id
        },
        include: {
            model: Product,
            attributes: ['product_name', 'price']
        }
    })
    .then(dbCatData => {
        if (!dbCatData) {
            res.status(400).json({ message: 'No category found with this id!' });
            return
        }
        res.json(dbCatData)
    })
    .catch(err => res.status(500).json(err));
});

//POST new quote
router.post('/', (req, res) => {
    Quotes.create({
        author:  req.body.author,
        quote: req.body.quote,
        reference: req.body.reference,
        reason_id: req.body.reason_id,
        userIds: req.body.userIds,
        include: {
            model: 'user_quotes',
            attributes: ['user_id'],
        }
       })
        .then((quotes) => {
            if (req.body.userIds.length) {
            const userIdArr = req.body.userIds.map((user_id) => {
                console.log("quote id is :", quotes.id)
                console.log("user_id is :", user_id)

                return {
                    quotes_id: quotes.id,
                    user_id,
                }
            });
            console.log("userIdArr is :", userIdArr)
            return User_Quotes.bulkCreate(userIdArr);
        }
        // if no user id, just respond
        res.status(200).json(quotes);
    })
    .then((userIds) => res.status(200).json(userIds))
    // } res.json(dbCatData))
    .catch(err =>{
        console.log(err);
        res.status(400).json(err);
    })
});

//PUT update quote
router.put('/:id', (req, res) => {
    Quotes.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((quote) => {
      // find all associated tags from ProductTag
      console.log("req.params.id is :", req.params.id)
      return User_Quotes.findAll({ where: { quotes_id: req.params.id } });
    })
    .then((userQuotes) => {
        // get list of current tag_ids
        console.log("userQuotes is :", userQuotes)
        // console.log("userIds is :", userIds)
        // console.log("user_id is : ", user_id)
        const userQuoteIds = userQuotes.map(({ user_id }) => user_id);
        // create filtered list of new tag_ids
        const newUserQuotes = req.body.userIds
          .filter((user_id) => !userQuoteIds.includes(user_id))
          .map((user_id) => {
            return {
              quotes_id: req.params.id,
              user_id,
            };
          });
        // figure out which ones to remove
        const userQuotesToRemove = userQuotes
          .filter(({ user_id }) => !req.body.userIds.includes(user_id))
          .map(({ id }) => id);
  
        // run both actions
        return Promise.all([
          User_Quotes.destroy({ where: { id: userQuotesToRemove } }),
          User_Quotes.bulkCreate(newUserQuotes),
        ]);
      })
      .then((updatedUserQuotes) => res.json(updatedUserQuotes))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});

//DELETE quote
router.delete('/:id', (req, res) => {
    Quotes.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(quoteData => {
        if (!quoteData) {
            res.status(400).json({ message: 'No quote found with this id' })
            return
        }
        res.json(quoteData)
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router