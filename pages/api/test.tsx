import type { NextApiRequest, NextApiResponse } from 'next'
import * as axios from 'axios'

import { getAxieBodyStructure512 } from '@axieinfinity/mixer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const axiesID = req.body.axiesID
    const url = 'https://api-gateway.skymavis.com/graphql/axie-marketplace'

    let query = ''

    for (let i = 0; i < axiesID.length; i++) {
        query += `  axie${axiesID[i]}:axie(axieId: "${axiesID[i]}") { id newGenes  }`
    }

    const body = {
        'query': `query MyQuery {${query}}`,
        'operationName': 'MyQuery'
    }


    const axiesGene = (await axios.default.post(url, body, { headers: { 'x-api-key': '0weldYWOMlN4timLwdOc3YL4KhhyHQ6q' } })).data.data
    const axies: any[] = []

    for (let i = 0; i < Object.keys(axiesGene).length; i++) {
        const gene = axiesGene[Object.keys(axiesGene)[i]].newGenes
        const bodyGroup = getAxieBodyStructure512(gene)
        const parts = [
            `${bodyGroup.parts.Mouth.groups[0].class.toLowerCase()}-mouth-${transformValue(bodyGroup.parts.Mouth.groups[0].value)}`,
            `${bodyGroup.parts.Horn.groups[0].class.toLowerCase()}-horn-${transformValue(bodyGroup.parts.Horn.groups[0].value)}`,
            `${bodyGroup.parts.Back.groups[0].class.toLowerCase()}-back-${transformValue(bodyGroup.parts.Back.groups[0].value)}`,
            `${bodyGroup.parts.Tail.groups[0].class.toLowerCase()}-tail-${transformValue(bodyGroup.parts.Tail.groups[0].value)}`,
        ]
        axies.push({ id: axiesGene[Object.keys(axiesGene)[i]].id, parts, flag: false })
    }

    axies.map((axie) => {
        for (let i = 0; i < axies.length; i++) {
            if (JSON.stringify(axie.parts) === JSON.stringify(axies[i].parts) && axie.id !== axies[i].id) {
                axie.flag = true
            }
        }
        return axie
    })

    res.status(200).json(axies)
}

function transformValue(val: number) {
    if (val >= 10) {
        return val
    }
    return `0${val}`
}
