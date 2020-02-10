module.exports =  function(app, sequelize, models){

    console.log('\tdomain requests loaded');

    let Domain = models.Domain;

     /**
     *   This request gets all the domains in the database.
     *   arguments :
     *               none
     *   returns :
     *               an json array of domains
     */
    app.get('/domains', function(req, res){
        Domain.findAll()
            .then(domains => {
                res.send({'domains': domains});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *   This request gets an domain according to its id.
     *   arguments :
     *               id : the id of the domain
     *   returns :
     *               a json object containing the domain
     */
    app.get('/domains/:id', function(req, res){
        Domain.findByPk(req.params.id)
            .then(domain => {
                res.send({'domain': domain});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests creates a new domain with the name, description, starting and ending date, supervisor id and event id
     *  arguments :
     *              name: the name of the domain
     *  returns :
     *              a json object containing the created domain
     */
    app.post('/domains', function(req, res){
        console.log(req.body)
        Domain.create(req.body)
            .then(domain => {
                res.send({'domain': domain});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This request updates a domain according to its id.
     *  arguments :
     *              id : the id of the domain
     *              name: the name of the domain
     *  returns :
     *              the updated object
     */
    app.put('/domains/:id', function(req, res){
        Domain.update(req.body, {where: {id: req.params.id}})
            .then(() => {
                Domain.findByPk(req.params.id)
                    .then(domain => {
                        res.send({'domain': domain});
                    })
                    .catch(err => {
                        res.status(500).send({'error': err})
                    });
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

    /**
     *  This requests deletes a domain according to its id.
     *  arguments :
     *              id : the id of the domain
     *  returns :
     *              a result being 1 if succeeded, 0 else
     */
    app.delete('/domains/:id', function(req, res){
        Domain.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(result => {
                res.send({'result': result});
            })
            .catch(err => {
                res.status(500).send({'error': err})
            });
    });

}