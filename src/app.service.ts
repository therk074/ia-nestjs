import { Injectable, Logger } from '@nestjs/common';

const logger = new Logger('app')
@Injectable()
export class AppService {
  constructor() {
  }

  getHello(): string {
    return 'Hello World!';
  }

  postTriangle(body: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(body.base, body.height)
        if (!body.base || !body.height) {
          const msg = `base and height are required`
          logger.log(msg)
          resolve(msg)
          return
        }

        const findTriangle = 1 / 2 * body.base * body.height
        const area = { area: findTriangle }
        logger.log(`Requested Triangle funciont: ${findTriangle}`)
        resolve(area)


      } catch (error) {
        logger.log(error);
        reject(error.message);
      }
    })
  }

  async CheckCitizenId(citizen_id: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {

        let multipleNo = []
        let characterNo = citizen_id.split('') //step1
        let character = []
        let summary = null

        for (let each = 13; each > 1; each--) { // 13-2
          multipleNo.push(each)
        }

        for (let index = 0; index <= characterNo.length; index++) { //step2
          if (index == 12) break
          // console.log(characterNo[index], multipleNo[index])
          character.push(characterNo[index] * multipleNo[index])
        }

        for (let each of character) { //step3
          summary += each
        }

        let mod = summary % 11 //step4
        let chkDegit = 11 - mod //step5 digit will equal
        // let chkDegit = 10 // step5 test no equal 

        if (chkDegit > 9) {
          chkDegit = parseInt(String(chkDegit).slice(-1))
        }

        if (parseInt(characterNo[12]) === chkDegit) {
          resolve(true)
        } else {
          resolve(false)
        }

      } catch (error) {
        logger.log(error);
        reject(error.message);
      }
    })
  }

  async postCitizen(citizen_id: string) {
    try {
      if (!citizen_id) {
        const msg = `Citizen Id is required`
        logger.log(msg)
        return (msg)
      }
      let chkDegit = (await this.CheckCitizenId(citizen_id)) ? 'Citizen ID is valid' : 'Citizen ID is invalid'
      logger.log(chkDegit)
      return chkDegit

    } catch (error) {
      logger.log(error);
      return (error.message);
    }
  }

  async loopStar() {
    let loop = []
    let stars = '*'
    let star = ''
    let spaces = ' '
    let space = ''


    for (let no = 1; no <= 4; no++) {
      loop.push('x' + no)
      if (no != 1) {
        star += stars
        loop[no - 1] += star + star
      }
      loop[no - 1] += no.toString()
    }
    for (let no = 4; no >= 1; no--) {
      space += spaces
      if (no != 4) {
        loop.push(loop[no - 1].replace('x', space))
      }
      loop[no - 1] = loop[no - 1].replace('x', space)
    }

    console.log(loop)
    return loop
  }
}
