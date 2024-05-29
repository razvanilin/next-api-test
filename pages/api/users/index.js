import { User } from '../../../database/models';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.findAll();
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
