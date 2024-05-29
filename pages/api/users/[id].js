import { User } from '../../../database/models';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
        await user.update(req.body);
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
        }
        await user.destroy();
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}