const BaseError = require('./base.error')
const {StatusCodes} = require('http-status-codes')
class BadRequest extends BaseError{
    constructor(propertyName){
        super("BadRequest",StatusCodes.BadRequest, `Invalid structure for ${propertyName} provided`

        )
    }
}
module.exports=BadRequest