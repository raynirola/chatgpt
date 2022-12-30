import { CronJob } from 'cron'
import chat from '@/lib/chat'

const Crons: Set<CronJob> = new Set()

const refreshSessionJob = new CronJob('0 */2 * * *' /* every 2 hours */, async () => await chat.refreshSession())

Crons.add(refreshSessionJob)

class Cron {
  static start() {
    Crons.forEach(cron => cron.start())
  }
}

export default Cron
