'use strict'

const fs = require('fs')
const _ = require('underscore')

try{
    const config = JSON.parse(fs.readFileSync('./snerrfile.json')).config
    _.each(config, (con) => {
        if(!(typeof con.pre=='string' && typeof con.post=='string' && typeof con.length == 'number' && typeof con.skip == 'boolean'))
            return console.error('SN101FE')
    })
}
catch(e){
    return console.error('SN101NF')
}

module.exports = {
    err : (snerr, err, addMessage) => {
        let file
        console.log('here')
        try{
            file = JSON.parse(fs.readFileSync('./snerrfile.json'))
        }
        catch(e){
            return console.error('SN101NF')
        }

        const config = file.config
        let code = file.code, message = ""
        let error = {code: snerr,err: err, message: null}

        //cycle through all levels of config [SN] [4] [01] [NF]
        try{
            _.each(config, (con) => {
                //break down the snerr code into json keys
                const key = snerr.substring(0, con.length)
                snerr = snerr.substring(con.length)

                //if key does not exist in code, add key
                if(!code[key])
                    code[key] = {"is": ""}
                code = code[key]

                //to add decoded message to error object (will only work once snerrfile has been updated with meaning)
                if(addMessage)
                    message += con.skip? "": (con.pre + code.is + con.post)
            })
            if(addMessage) //flag check
                error.message = message
        }
        catch(e){
            return console.error('SN101FE')
        }
        try{
            fs.writeFileSync('./snerrfile.json', JSON.stringify(file, null, 2))
        }
        catch(e){
            console.error('SN101NF')
        }
        return error
    },
    show : (snerr) => {
        let file
        try{
            file = JSON.parse(fs.readFileSync('./snerrfile.json'))
        }
        catch(e){
            return console.error('SN101NF')
        }

        const config = file.config
        let code = file.code, message = ""

        //cycle through all levels of config [SN] [4] [01] [NF]
        try{
            _.each(config, (con) => {
                //break down the snerr code into json keys
                const key = snerr.substring(0, con.length)
                snerr = snerr.substring(con.length)
                code = code[key]

                //decode step by step using config
                message += con.skip? "": (con.pre + code.is + con.post)
            })
        }
        catch(e){
            return console.error('SN101FE')
        }
        return message
    }
}