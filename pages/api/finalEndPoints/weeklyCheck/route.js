import pLimit from "p-limit"
import locker from "../../../../lib/providers/locker"
import Invitation from "../../../../models/invitation"
import flagedBehaviorForAll from "../../../../lib/flagedBehaviorForAll"
import getImportantPanic from "../../../../lib/getImportantPanic"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
        await POST(req, res)
        break
        default:
        res.status(405).end() // Method Not Allowed
        break
    }
    }
async function POST(req, res) {
    const inImportantPanic = await getImportantPanic()
    if(inImportantPanic) return res.status(400).json({ message: 'Refunds are closed' })
    const invitation = Invitation()
  const allInvitations = await invitation.findAll()
  await flagedBehaviorForAll().then(()=>{
      const processInvitation = async (invitation) => {
    
        Object.keys(invitation.self_tree_positions).forEach(key => {
            invitation.self_tree_positions[key].changeable = false;
        });
    
        invitation.changed('self_tree_positions', true);
        await locker.lockAndWait(`invitation-${invitation.id}`, 1000 * 60);
        await invitation.save();
        await locker.unlock(`invitation-${invitation.id}`);
    };
    
    const processAllInvitations = async (allInvitations) => {
        const limit = pLimit(10); 
        const tasks = allInvitations.map(invitation => 
            limit(() => processInvitation(invitation))
        );
        await Promise.all(tasks);
    };
    
    processAllInvitations(allInvitations)
        .then(() => {console.log('All invitations processed concurrently'); res.status(200).end()})
        .catch(error => console.error('An error occurred:', error));
  })
}
    