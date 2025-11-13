// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clear existing data
  await prisma.tutorial.deleteMany()

  // Create enhanced tutorials with platform field
  const tutorials = [
    {
      title: 'Facebook Basics: Creating Your First Post',
      description: 'Learn how to create and share posts on Facebook',
      category: 'facebook',
      platform: 'facebook',
      difficulty: 'beginner',
      estimatedTime: 10,
      steps: [
        { step: 1, title: 'Open Facebook', description: 'Click the Facebook app icon' },
        { step: 2, title: 'Find Post Box', description: 'Look for "What\'s on your mind?"' },
        { step: 3, title: 'Write Your Message', description: 'Type what you want to share' },
        { step: 4, title: 'Share Your Post', description: 'Click the "Post" button' }
      ]
    },
    {
      title: 'WhatsApp: Sending Photos to Family',
      description: 'Learn how to send photos through WhatsApp',
      category: 'whatsapp',
      platform: 'whatsapp',
      difficulty: 'beginner',
      estimatedTime: 8,
      steps: [
        { step: 1, title: 'Open WhatsApp', description: 'Tap the WhatsApp icon' },
        { step: 2, title: 'Choose Contact', description: 'Select a family member' },
        { step: 3, title: 'Attach Photo', description: 'Tap the paperclip icon' },
        { step: 4, title: 'Select Photo', description: 'Choose a photo from your gallery' },
        { step: 5, title: 'Send', description: 'Tap the send button' }
      ]
    }
  ]

  for (const tutorialData of tutorials) {
    const tutorial = await prisma.tutorial.create({
      data: tutorialData
    })
    console.log(`Created tutorial: ${tutorial.title}`)
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })