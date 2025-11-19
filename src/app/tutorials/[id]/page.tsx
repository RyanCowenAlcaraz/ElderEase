'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface TutorialStep {
  id: number
  title: string
  content: string
  imageUrl?: string
  videoUrl?: string
  duration: number
  detailedDescription?: string
  tips?: string[]
}

interface Tutorial {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  estimatedTime: number
  platform: string
  steps: TutorialStep[]
  progress?: {
    completed: boolean
    currentStep: number
  }
  isBookmarked?: boolean
}

export default function TutorialPage() {
  const router = useRouter()
  const params = useParams()
  const tutorialId = params.id as string

  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showStepDetails, setShowStepDetails] = useState(true)

  useEffect(() => {
    loadTutorial()
  }, [tutorialId])

  const loadTutorial = async () => {
    try {
      const response = await fetch(`/api/tutorials/${tutorialId}`)
      
      if (!response.ok) {
        throw new Error('Tutorial not found')
      }

      const data = await response.json()
      const foundTutorial = data.tutorial

      if (foundTutorial) {
        setTutorial(foundTutorial)
        setCurrentStep(foundTutorial.progress?.currentStep || 0)
        setIsBookmarked(foundTutorial.isBookmarked || false)
        setIsCompleted(foundTutorial.progress?.completed || false)
      } else {
        router.push('/tutorials')
      }
    } catch (error) {
      console.error('Error loading tutorial:', error)
      loadFallbackTutorial()
    } finally {
      setIsLoading(false)
    }
  }

  const loadFallbackTutorial = () => {
    const mockTutorials: { [key: string]: Tutorial } = {
      '1': {
        id: '1',
        title: 'Getting Started with Facebook',
        description: 'Learn how to create an account, find friends, and make your first post on Facebook',
        category: 'facebook',
        difficulty: 'beginner',
        estimatedTime: 15,
        platform: 'facebook',
        isBookmarked: true,
        progress: { completed: false, currentStep: 2 },
        steps: [
          {
            id: 1,
            title: 'Creating Your Account',
            content: 'Visit facebook.com and click "Create New Account". Fill in your name, email, password, and birthday.',
            detailedDescription: 'To create your Facebook account, first open your web browser (like Chrome, Safari, or Edge) and type "facebook.com" in the address bar. When the page loads, look for the "Create New Account" button - it\'s usually a green button below the login form. Click this button to start the registration process. You\'ll need to provide your first name, last name, email address or mobile number, a secure password, and your date of birth. Make sure to use a strong password with a mix of uppercase letters, lowercase letters, numbers, and symbols for better security. Facebook will send a confirmation code to your email or phone to verify your account.',
            imageUrl: '/images/facebook-signup.png',
            videoUrl: 'https://www.youtube.com/watch?v=m1H0yLa_1gA',
            duration: 3,
            tips: [
              'Use an email address you check regularly for account recovery',
              'Choose a password you can remember but others can\'t guess easily',
              'Your birthday helps Facebook show you relevant content and birthday greetings',
              'Keep your password in a safe place or use a password manager'
            ]
          },
          {
            id: 2,
            title: 'Setting Up Your Profile',
            content: 'Add a profile picture and cover photo. This helps friends recognize you.',
            detailedDescription: 'After creating your account, Facebook will guide you through setting up your profile. Click on your name at the top right corner to go to your profile page. To add a profile picture, hover your mouse over the circular camera icon in the profile picture area and click "Upload Photo". Choose a clear, recent photo of yourself where your face is visible. For the cover photo, click "Add Cover Photo" at the top of your profile and select an image that represents you - this could be a family photo, a beautiful landscape, or something you love. You can use photos from your computer or take a new one with your camera. Both photos can be changed anytime by clicking on them and selecting "Update Profile Picture" or "Update Cover Photo".',
            imageUrl: '/images/facebook-profile.png',
            videoUrl: 'https://www.youtube.com/watch?v=m1H0yLa_1gA',
            duration: 2,
            tips: [
              'Use a clear, well-lit photo for your profile picture where your face is visible',
              'Your cover photo can be a landscape, family photo, or something that represents your interests',
              'You can change these photos anytime without affecting your account',
              'Consider privacy settings when choosing photos - they can be public or limited to friends'
            ]
          },
          {
            id: 3,
            title: 'Finding Friends',
            content: 'Search for friends by name or let Facebook suggest friends from your email contacts.',
            detailedDescription: 'Facebook makes it easy to connect with people you know. The platform will automatically suggest friends based on your information, contacts, and networks. To find friends manually, click on the "Friends" icon (which looks like two silhouettes) in the top menu, then click "Find Friends". You can search for people by typing their name in the search bar at the top of any Facebook page. Facebook may also suggest friends from your email contacts if you\'ve provided that information during signup. When you find someone you know, click the "Add Friend" button next to their name. They will receive a friend request notification and need to accept it before you become connected on Facebook. You can also import contacts from your email to find more friends.',
            imageUrl: '/images/facebook-friends.png',
            videoUrl: 'https://www.youtube.com/watch?v=m1H0yLa_1gA',
            duration: 4,
            tips: [
              'Only add people you know and trust in real life for safety',
              'You can cancel a friend request before it\'s accepted by going to your sent requests',
              'Organize friends into lists (like Close Friends or Family) for better privacy control',
              'If someone doesn\'t accept your request, don\'t take it personally - they might not check Facebook often'
            ]
          },
          {
            id: 4,
            title: 'Making Your First Post',
            content: 'Click "What\'s on your mind?" at the top of your News Feed to share updates with friends.',
            detailedDescription: 'Sharing updates with friends is one of the main features of Facebook. To make your first post, go to your News Feed by clicking the Facebook logo in the top left corner. Find the box that says "What\'s on your mind?" or "Create Post" at the top of the page. Click inside this box to start typing your message. You can share text, photos, videos, how you\'re feeling, or check in at locations. Before posting, you can choose who sees your post by clicking the audience selector (usually says "Friends" by default). Options include Public (anyone), Friends (only your Facebook friends), Only Me, or Custom (specific people). When you\'re ready, click the "Post" button to share your update. Your post will appear in your friends\' News Feeds and on your own timeline.',
            imageUrl: '/images/facebook-post.png',
            videoUrl: 'https://www.youtube.com/watch?v=m1H0yLa_1gA',
            duration: 3,
            tips: [
              'Think before you post - once something is online, it can be hard to remove completely',
              'You can edit or delete your posts later by clicking the three dots in the top right of the post',
              'Use the privacy settings to control who sees each individual post',
              'Tag friends in posts by typing @ followed by their name to get their attention'
            ]
          },
          {
            id: 5,
            title: 'Liking and Commenting',
            content: 'Engage with friends\' posts by clicking "Like" or leaving a comment.',
            detailedDescription: 'Interacting with friends\' content helps build connections on Facebook. When you see posts from friends in your News Feed, you can engage with them in several ways. The "Like" button (thumbs up icon) lets you show appreciation without writing anything - just click it once to like, click again to remove the like. To leave a comment, click the "Comment" button below the post and type your message in the text box that appears. You can also use reaction emojis by hovering over the Like button - options include Like (thumbs up), Love (heart), Care (hugging face), Haha (laughing), Wow (surprised), Sad (tearful), or Angry (red face). Comments are visible to anyone who can see the original post, unless you change your comment privacy settings.',
            imageUrl: '/images/facebook-engage.png',
            videoUrl: 'https://www.youtube.com/watch?v=m1H0yLa_1gA',
            duration: 3,
            tips: [
              'Be kind and respectful in your comments - Facebook is a social space',
              'You can like your own posts if you want to show you appreciate the content',
              'React with different emojis to express different emotions about the post',
              'You can edit or delete your comments later if you change your mind'
            ]
          }
        ]
      },
      '2': {
  id: '2',
  title: 'Facebook Privacy Settings',
  description: 'Learn how to control who sees your posts and personal information',
  category: 'facebook',
  difficulty: 'intermediate',
  estimatedTime: 12,
  platform: 'facebook',
  isBookmarked: false,
  progress: { completed: false, currentStep: 0 },
  steps: [
    {
      id: 1,
      title: 'Accessing Privacy Settings',
      content: 'Click the arrow in the top right corner and select "Settings & Privacy", then "Settings".',
      detailedDescription: 'Accessing your privacy settings is the first step to controlling your Facebook experience. Look for the downward-facing arrow in the top right corner of any Facebook page (it\'s next to the question mark icon). Click this arrow to open a dropdown menu with various options. From this menu, hover over or click "Settings & Privacy" to expand it, then click "Settings" from the options that appear. This will take you to the main Settings page where you can control all aspects of your Facebook account, including privacy, security, notifications, timeline and tagging, and more. The Settings page is organized into sections in the left sidebar for easy navigation.',
      imageUrl: '/images/facebook-privacy1.png',
      videoUrl: 'https://www.youtube.com/watch?v=UYzLJ4Nu92c',
      duration: 2,
      tips: [
        'Bookmark the Settings page in your browser for easy access later',
        'Review your privacy settings every few months as Facebook updates its features',
        'The Settings menu might look different on mobile apps but contains the same options',
        'Take your time exploring each section to understand all available options'
      ]
    },
    {
      id: 2,
      title: 'Controlling Post Visibility',
      content: 'Go to "Privacy" settings to choose who can see your future posts (Public, Friends, Only Me).',
      detailedDescription: 'Controlling who sees your posts is crucial for maintaining your privacy on Facebook. In the Settings menu, click "Privacy" in the left sidebar. Here you\'ll find several important options. For future posts, click "Edit" next to "Who can see your future posts?" and choose from these options: Public (anyone on or off Facebook), Friends (only your approved friends), Friends Except (all friends except specific people), Specific Friends (only selected friends), or Only Me (completely private). You can also limit the audience for past posts by clicking "Limit Past Posts" - this changes all your old Public posts to Friends only. Additionally, you can control who can send you friend requests and who can look you up using your email or phone number.',
      imageUrl: '/images/facebook-privacy2.png',
      videoUrl: 'https://www.youtube.com/watch?v=UYzLJ4Nu92c',
      duration: 3,
      tips: [
        'Set your default to "Friends" for better privacy on new posts',
        'You can still make individual posts Public or more restricted as needed when creating them',
        'Limiting past posts is a good way to quickly improve your overall privacy',
        'Consider using "Friends Except" for posts you want to share widely but not with specific people'
      ]
    },
    {
      id: 3,
      title: 'Managing Profile Information',
      content: 'Control who can see your email, phone number, and other personal details.',
      detailedDescription: 'Your profile contains various personal information that you can control. In the Privacy settings, scroll down to "How People Find and Contact You" section. Here you can manage who can see your email, phone number, and other contact information. Click "Edit" next to each option to change the visibility. You can also control who can see your friends list, who can post on your timeline, and who can see what others post on your timeline. For more detailed control, go to your actual profile page and click "About" in the left sidebar. Here you can edit each piece of information individually and set specific privacy levels for your workplace, education, current city, hometown, relationship status, and more.',
      imageUrl: '/images/facebook-privacy3.png',
      videoUrl: 'https://www.youtube.com/watch?v=UYzLJ4Nu92c',
      duration: 3,
      tips: [
        'Consider setting sensitive information like phone number to "Only Me"',
        'Regularly review what information is publicly visible on your profile',
        'You can remove information entirely if you don\'t want it on Facebook',
        'Be cautious about sharing specific location information like your home address'
      ]
    },
    {
      id: 4,
      title: 'Blocking Users',
      content: 'Learn how to block people you don\'t want to interact with on Facebook.',
      detailedDescription: 'If someone is bothering you or you simply don\'t want to interact with them, blocking is a powerful tool. In Settings, go to "Blocking" in the left sidebar. Here you\'ll find several blocking options. To block a specific person, type their name or email address in the "Block users" section and click "Block". Once blocked, that person can no longer see your profile, tag you, invite you to events or groups, start conversations with you, or add you as a friend. If they\'re already your friend, blocking will automatically unfriend them. You can also block messages from specific people, block app invites, and block event invites. To unblock someone later, find their name in your blocked list and click "Unblock".',
      imageUrl: '/images/facebook-block.png',
      videoUrl: 'https://www.youtube.com/watch?v=UYzLJ4Nu92c',
      duration: 2,
      tips: [
        'Blocking is reversible - you can unblock someone anytime',
        'Blocked users won\'t be notified that you blocked them',
        'Consider unfriending or restricting someone before blocking if you want less drastic measures',
        'Keep a list of people you\'ve blocked in case you want to unblock them later'
      ]
    },
    {
      id: 5,
      title: 'Reviewing Activity Log',
      content: 'Check your activity log to see all your posts and interactions.',
      detailedDescription: 'Your Activity Log is a comprehensive record of everything you\'ve done on Facebook. To access it, go to your profile and click the three dots below your cover photo, then select "Activity Log". Alternatively, go to Settings > Your Facebook Information > Activity Log. Here you can see all your posts, comments, reactions, search history, and more, organized by date. You can filter by category using the links on the left side. The Activity Log is useful for reviewing and managing your past activity - you can delete posts, change their privacy settings, or hide them from your timeline. You can also download your information from here if you want a copy of all your Facebook data.',
      imageUrl: '/images/facebook-activity.png',
      videoUrl: 'https://www.youtube.com/watch?v=UYzLJ4Nu92c',
      duration: 2,
      tips: [
        'Regularly review your Activity Log to maintain your desired online presence',
        'Use the filters to quickly find specific types of content',
        'You can bulk delete or change privacy settings for multiple items at once',
        'Downloading your information regularly is good practice for data backup'
      ]
    }
  ]
},
      '3': {
        id: '3',
        title: 'Sending Messages on WhatsApp',
        description: 'Learn to send text messages, photos, and make voice calls with WhatsApp',
        category: 'whatsapp',
        difficulty: 'beginner',
        estimatedTime: 10,
        platform: 'whatsapp',
        isBookmarked: false,
        progress: { completed: false, currentStep: 3 },
        steps: [
          {
            id: 1,
            title: 'Download and Install',
            content: 'Download WhatsApp from your phone\'s app store and verify your phone number.',
            detailedDescription: 'To start using WhatsApp, you first need to install it on your smartphone. Open your device\'s app store (Google Play Store on Android or App Store on iPhone). Use the search function and type "WhatsApp". Look for the official WhatsApp Messenger app with the green phone icon. Tap "Install" or "Get" to download and install it on your device. Once installed, open the app by tapping its icon. WhatsApp will ask for permission to access your contacts - this is normal as it needs them to find your friends who also use WhatsApp. You\'ll then need to verify your phone number. Enter your mobile number including country code, and WhatsApp will send a verification code via SMS. Enter this code when prompted to complete setup.',
            imageUrl: '/images/whatsapp-download.png',
            videoUrl: 'https://www.youtube.com/watch?v=fsh-b7Xo10w',
            duration: 2,
            tips: [
              'Make sure you have a stable internet connection during setup',
              'Use the phone number that you commonly use for messaging',
              'WhatsApp will automatically detect the verification code in most cases',
              'If you don\'t receive the SMS, you can choose the "Call me" option for voice verification'
            ]
          },
          {
            id: 2,
            title: 'Finding Contacts',
            content: 'WhatsApp automatically shows contacts from your phone who also use WhatsApp.',
            detailedDescription: 'One of WhatsApp\'s best features is how easily it connects you with people you know. After verification, WhatsApp will automatically scan your phone\'s contacts and show you which of them are already using WhatsApp. To see your contacts, tap the "Chats" tab at the bottom, then tap the new chat icon (usually a message bubble with a pen) in the bottom right corner. You\'ll see a list of all your phone contacts who have WhatsApp. Contacts with WhatsApp will show their profile picture and status. If someone isn\'t appearing, they might not have WhatsApp installed, or they might be using a different phone number than the one you have saved. You can also manually search for contacts using the search bar at the top of the screen.',
            imageUrl: '/images/whatsapp-contacts.png',
            videoUrl: 'https://www.youtube.com/watch?v=fsh-b7Xo10w',
            duration: 2,
            tips: [
              'WhatsApp only shows contacts who have the app installed and verified',
              'Make sure your contacts are saved with their correct country codes',
              'You can refresh your contacts list by pulling down on the screen',
              'If contacts are missing, ask them to check if they have WhatsApp installed'
            ]
          },
          {
            id: 3,
            title: 'Sending a Text Message',
            content: 'Tap on a contact, type your message in the text box, and press send.',
            detailedDescription: 'Sending text messages on WhatsApp is straightforward. From the Chats tab, tap on any contact to open a conversation with them. At the bottom of the screen, you\'ll see a text input field that says "Type a message". Tap this field to bring up your phone\'s keyboard. Type your message as you would normally. When you\'re ready to send, tap the send button (paper airplane icon) to the right of the text field. Your message will appear in the chat with a timestamp. You\'ll see one check mark when sent, and two check marks when delivered to the recipient\'s phone. If the check marks turn blue, it means the recipient has read your message. You can also see when someone is typing a reply - you\'ll see "typing..." appear below their name.',
            imageUrl: '/images/whatsapp-text.png',
            videoUrl: 'https://www.youtube.com/watch?v=fsh-b7Xo10w',
            duration: 2,
            tips: [
              'You can send messages to multiple people by creating a group',
              'Use emojis by tapping the smiley face icon next to the text field',
              'Press and hold the send button to send messages with special effects',
              'If a message fails to send, check your internet connection and try again'
            ]
          },
          {
            id: 4,
            title: 'Sending Photos and Videos',
            content: 'Tap the attachment icon (paperclip) next to the text box to send media files.',
            detailedDescription: 'Sharing photos and videos on WhatsApp is very popular. To send media, open a chat and tap the attachment icon (paperclip or plus sign) next to the text input field. This will open a menu with several options. Tap "Gallery" or "Photos" to access your phone\'s photo library. You can select multiple photos or videos by tapping on them - selected items will have a check mark. After selecting, tap the send button (paper airplane). For taking and sending a new photo immediately, tap "Camera" from the attachment menu - this will open your phone\'s camera so you can take a picture and send it right away. You can also send documents, your location, or contact cards using the other options in the attachment menu.',
            imageUrl: '/images/whatsapp-media.png',
            videoUrl: 'https://www.youtube.com/watch?v=fsh-b7Xo10w',
            duration: 2,
            tips: [
              'You can send up to 30 photos or videos at once',
              'WhatsApp compresses media to save data - tap the settings icon before sending to change quality',
              'For important photos, consider sending as "Document" to maintain original quality',
              'You can add captions to photos by typing in the text field before sending'
            ]
          },
          {
            id: 5,
            title: 'Making Voice and Video Calls',
            content: 'Tap the phone or video icon at the top right to start a call.',
            detailedDescription: 'WhatsApp offers free voice and video calls over the internet. To make a call, open a chat with the person you want to call. At the top right of the screen, you\'ll see two icons: a phone for voice calls and a camera for video calls. Tap the phone icon to start a voice call, or the camera icon to start a video call. The recipient will receive a call notification and can choose to answer or decline. During a call, you\'ll see various options: mute your microphone, turn your video on/off (video calls), switch to speakerphone, or add more people to the call. To end the call, tap the red phone icon. WhatsApp calls use your internet connection, so they don\'t use your cellular plan minutes, but they do use data.',
            imageUrl: '/images/whatsapp-call.png',
            videoUrl: 'https://www.youtube.com/watch?v=fsh-b7Xo10w',
            duration: 2,
            tips: [
              'Use Wi-Fi for better call quality and to save mobile data',
              'You can switch between voice and video during a call',
              'Group calls support up to 8 people for video and 32 for voice',
              'Make sure you have good internet connection for clear video calls'
            ]
          }
        ]
      },
      '4': {
        id: '4',
        title: 'WhatsApp Groups and Broadcast',
        description: 'Learn to create groups and send messages to multiple contacts',
        category: 'whatsapp',
        difficulty: 'intermediate',
        estimatedTime: 8,
        platform: 'whatsapp',
        isBookmarked: false,
        progress: { completed: false, currentStep: 0 },
        steps: [
          {
            id: 1,
            title: 'Creating a Group',
            content: 'Tap "New Group" and select contacts you want to add to the group.',
            detailedDescription: 'WhatsApp groups are great for communicating with multiple people at once. To create a group, go to the Chats tab and tap the three dots in the top right corner (on Android) or "New Chat" (on iPhone), then select "New Group". You\'ll see your contacts list - tap on each person you want to add to the group. Selected contacts will show a check mark. You can add up to 256 participants to a WhatsApp group. After selecting participants, tap the green arrow to continue. Now you can set a group subject (name) and optionally add a group icon. The group subject should be descriptive so members understand the group\'s purpose. Once you\'ve set these details, tap "Create" to finalize your group. You\'ll be taken directly to the new group chat where you can start messaging.',
            imageUrl: '/images/whatsapp-group1.png',
            videoUrl: 'https://www.youtube.com/watch?v=6N7Vf4k9p_c',
            duration: 2,
            tips: [
              'Choose a clear group name that reflects the group\'s purpose',
              'Start with a welcome message when you create the group',
              'You can always add or remove members later',
              'Consider creating groups for family, friends, work, or specific interests'
            ]
          },
          {
            id: 2,
            title: 'Managing Group Settings',
            content: 'Set group name, photo, and control who can send messages.',
            detailedDescription: 'As a group admin, you have several tools to manage your group. To access group settings, open the group chat and tap the group subject at the top. Here you\'ll find various options. You can change the group subject, group icon, and group description by tapping on them. In "Group Settings", you can control who can edit group info (all participants or only admins) and who can send messages (everyone or only admins). The "Participants" section shows all group members - here you can add new members, remove existing ones, or make other participants admins to help manage the group. You can also exit the group if you no longer want to be a member, or clear the entire chat history if needed.',
            imageUrl: '/images/whatsapp-group2.png',
            videoUrl: 'https://www.youtube.com/watch?v=6N7Vf4k9p_c',
            duration: 2,
            tips: [
              'Use the group description to set rules or state the group\'s purpose',
              'Restricting messaging to admins can help control spam in large groups',
              'Regularly update the group photo to keep it fresh and recognizable',
              'Consider having multiple admins for active groups'
            ]
          },
          {
            id: 3,
            title: 'Using Broadcast Lists',
            content: 'Create broadcast lists to send messages to multiple contacts without creating a group.',
            detailedDescription: 'Broadcast lists are different from groups - they allow you to send messages to multiple contacts at once, but recipients won\'t see each other\'s replies or know who else received the message. To create a broadcast list, go to Chats tab, tap the three dots (Android) or "New Chat" (iPhone), and select "New Broadcast". You\'ll see your contacts list - select all the people you want to include in your broadcast. Tap the check mark or "Create" when done. Give your broadcast list a name for easy identification. Now when you send a message in this broadcast chat, it will go to all selected contacts individually. They will receive it as a normal message from you and can reply privately. Only contacts who have your number saved will receive broadcast messages.',
            imageUrl: '/images/whatsapp-broadcast.png',
            videoUrl: 'https://www.youtube.com/watch?v=6N7Vf4k9p_c',
            duration: 2,
            tips: [
              'Use broadcast for announcements where individual replies are preferred',
              'Recipients can\'t see who else received the broadcast message',
              'Only contacts who have your number saved will receive broadcasts',
              'You can create multiple broadcast lists for different purposes'
            ]
          },
          {
            id: 4,
            title: 'Group Admin Features',
            content: 'Learn how to manage members and control group settings as an admin.',
            detailedDescription: 'As a group admin, you have special privileges to maintain order in the group. To manage members, open the group info by tapping the group subject, then tap "Participants". Here you can see all members with admins marked with "admin" below their names. To make someone an admin, tap their name and select "Make group admin". Admins can remove participants, add new ones, change group info, and control messaging permissions. To remove a participant, tap their name and select "Remove from group". If a group becomes too chaotic, you can set "Send Messages" to "Admins Only" temporarily. You can also demote other admins (except the group creator) by tapping their name and selecting "Dismiss as admin". The group creator is the primary admin and has the highest level of control.',
            imageUrl: '/images/whatsapp-admin.png',
            videoUrl: 'https://www.youtube.com/watch?v=6N7Vf4k9p_c',
            duration: 2,
            tips: [
              'Choose trustworthy people as admins to help manage the group',
              'Use admin privileges to remove spammers or rule-breakers promptly',
              'Communicate rule changes to the group before implementing them',
              'Consider creating a separate admin chat for coordination with other admins'
            ]
          }
        ]
      },
      '5': {
        id: '5',
        title: 'Watching Videos on YouTube',
        description: 'Discover how to search for videos, create playlists, and subscribe to channels',
        category: 'youtube',
        difficulty: 'beginner',
        estimatedTime: 12,
        platform: 'youtube',
        isBookmarked: true,
        progress: { completed: false, currentStep: 0 },
        steps: [
          {
            id: 1,
            title: 'Searching for Videos',
            content: 'Use the search bar at the top to find videos about any topic you\'re interested in.',
            detailedDescription: 'YouTube has an enormous library of videos on virtually every topic imaginable. To find videos, look for the search bar at the top of the YouTube app or website. It usually has a magnifying glass icon. Tap or click on the search bar to activate it, then type what you\'re looking for - this could be anything from "how to bake cookies" to "old music videos" or "gardening tips". As you type, YouTube will show suggestions based on popular searches. You can tap one of these suggestions or finish typing your search and tap the search icon (magnifying glass) or press Enter. The results page will show videos related to your search term. You can filter results by tapping "Filters" and choosing options like upload date, duration, or features.',
            imageUrl: '/images/youtube-search.png',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 2,
            tips: [
              'Use specific search terms for better results (e.g., "chocolate chip cookies recipe" instead of just "cookies")',
              'Try different word combinations if you don\'t find what you\'re looking for',
              'Use quotation marks to search for exact phrases',
              'Explore the suggested searches that appear as you type'
            ]
          },
          {
            id: 2,
            title: 'Playing and Pausing',
            content: 'Tap the play button to start a video. Tap again to pause.',
            detailedDescription: 'Playing videos on YouTube is straightforward. When you find a video you want to watch, tap on its thumbnail to open it. The video will start playing automatically in most cases. To pause the video, tap anywhere on the video screen - this will also make the playback controls appear. Tap again to resume playing. On the video controls, you\'ll see a play/pause button (right-facing arrow for play, two vertical lines for pause). You can also use this button to control playback. The video progress bar shows how far along you are in the video - you can tap and drag the circle on this bar to skip to different parts of the video. The volume can be controlled using your device\'s volume buttons or the volume slider in the controls.',
            imageUrl: '/images/youtube-play.png',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 1,
            tips: [
              'Double-tap the left or right side of the video to rewind or fast-forward 10 seconds',
              'Use the full-screen button (two arrows pointing outward) for a better viewing experience',
              'Swipe up or down on the left side of the screen to adjust brightness (on mobile)',
              'Swipe up or down on the right side to adjust volume (on mobile)'
            ]
          },
          {
            id: 3,
            title: 'Adjusting Volume and Brightness',
            content: 'Use your phone\'s volume buttons for sound. Swipe up/down on the screen for brightness.',
            detailedDescription: 'Controlling volume and brightness enhances your YouTube viewing experience. For volume control, use your device\'s physical volume buttons - usually located on the side of your phone or tablet. Press the upper button to increase volume, lower button to decrease. You can also use the on-screen volume slider that appears when you tap the video. For brightness control, on mobile devices, swipe up or down on the left edge of the screen while a video is playing. Swiping up increases brightness, swiping down decreases it. On computers, you can usually adjust brightness through your monitor settings or computer display settings. Some YouTube apps also have a brightness slider in the playback controls. Proper brightness ensures comfortable viewing, especially in different lighting conditions.',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 2,
            tips: [
              'Adjust brightness based on your environment - lower in dark rooms, higher in bright light',
              'Use headphones for better audio quality and privacy',
              'Consider enabling "Ambient mode" in settings for automatic brightness adjustment',
              'Save your eyes by avoiding maximum brightness in dark environments'
            ]
          },
          {
            id: 4,
            title: 'Liking and Subscribing',
            content: 'Tap the thumbs-up to like a video. Tap "Subscribe" to follow a channel.',
            detailedDescription: 'Engaging with content you enjoy helps creators and improves your YouTube experience. Below each video, you\'ll find several buttons. The thumbs-up icon is for liking a video - tap it to show appreciation. The thumbs-down is for disliking (though this is less commonly used). More importantly, the "Subscribe" button lets you follow a channel. When you subscribe to a channel, new videos from that creator will appear in your subscription feed, and you might receive notifications when they upload. Subscribing is free and helps support creators you enjoy. You can also tap the bell icon next to Subscribe to choose notification settings - "All" for all uploads, "Personalized" for some, or "None" for no notifications. Your subscriptions are private unless you make your subscriptions public in settings.',
            imageUrl: '/images/youtube-subscribe.png',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 2,
            tips: [
              'Subscribe to channels you want to see more content from',
              'Use the "Watch Later" button (clock icon) to save videos for later',
              'Create folders for your subscriptions to organize them by topic',
              'Don\'t feel pressured to subscribe to every channel you watch once'
            ]
          },
          {
            id: 5,
            title: 'Creating Playlists',
            content: 'Tap "Save" under a video to add it to a playlist for later watching.',
            detailedDescription: 'Playlists help you organize and save videos for later viewing. To add a video to a playlist, tap the "Save" button below the video (it looks like a bookmark or says "Save"). A menu will appear with your existing playlists and an option to create a new one. To create a new playlist, tap "Create new playlist", give it a name, and choose the privacy setting (Public, Unlisted, or Private). Then tap "Create". The video will be added to your new playlist. You can access your playlists by going to the Library tab and selecting "Playlists". Here you can view, edit, or delete your playlists. You can add multiple videos to the same playlist, rearrange their order, or remove videos you no longer want in the playlist.',
            imageUrl: '/images/youtube-playlist.png',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 3,
            tips: [
              'Create themed playlists (e.g., "Cooking Tutorials", "Favorite Music", "Exercise Videos")',
              'You can make playlists collaborative to let friends add videos',
              'Use the "Watch Later" playlist as a temporary holding place',
              'Share playlists with friends who have similar interests'
            ]
          },
          {
            id: 6,
            title: 'Sharing Videos',
            content: 'Tap the share icon to send videos to friends via message or email.',
            detailedDescription: 'Sharing interesting videos with friends is easy on YouTube. Below any video, you\'ll see a Share button (usually an arrow pointing right or says "Share"). Tapping this opens the sharing menu with various options. You can copy the video link to paste elsewhere, or share directly to other apps on your device like WhatsApp, Facebook, Twitter, or email. When you select an app, YouTube will create a message with the video link ready to send. You can also share to nearby devices using Bluetooth or create a QR code that others can scan to watch the video. Some videos can be embedded on websites or shared with start times if you want someone to watch from a specific point. Sharing helps creators reach more viewers and lets you discuss videos with friends.',
            imageUrl: '/images/youtube-share.png',
            videoUrl: 'https://www.youtube.com/watch?v=9mC6o-_w-Hc',
            duration: 2,
            tips: [
              'Use the "Start at" feature to share a video from a specific timestamp',
              'You can share videos to multiple apps at once on some devices',
              'Consider the context before sharing - make sure the content is appropriate for the recipient',
              'Use the "Copy link" option for maximum flexibility in sharing'
            ]
          }
        ]
      }
    }

    const foundTutorial = mockTutorials[tutorialId]
    if (foundTutorial) {
      setTutorial(foundTutorial)
      setCurrentStep(foundTutorial.progress?.currentStep || 0)
      setIsBookmarked(foundTutorial.isBookmarked || false)
      setIsCompleted(foundTutorial.progress?.completed || false)
    } else {
      router.push('/tutorials')
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setShowStepDetails(true)
  }

  const handleNextStep = async () => {
    if (!tutorial) return

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    setShowStepDetails(true)

    const userId = localStorage.getItem('elderease_user_id')
    if (userId) {
      try {
        await fetch('/api/progress', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            tutorialId: tutorial.id,
            currentStep: nextStep,
            completed: nextStep >= tutorial.steps.length
          })
        })

        if (nextStep >= tutorial.steps.length) {
          setIsCompleted(true)
        }
      } catch (error) {
        console.error('Error updating progress:', error)
      }
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setShowStepDetails(true)
    }
  }

  const toggleBookmark = async () => {
    if (!tutorial) return

    const userId = localStorage.getItem('elderease_user_id')
    if (!userId) return

    let newBookmarkState = !isBookmarked
    
    try {
      setIsBookmarked(newBookmarkState)

      await fetch('/api/bookmarks', {
        method: newBookmarkState ? 'POST' : 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          tutorialId: tutorial.id
        })
      })
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      setIsBookmarked(!newBookmarkState)
    }
  }

  const handleMarkComplete = async () => {
    if (!tutorial) return

    const userId = localStorage.getItem('elderease_user_id')
    if (userId) {
      try {
        await fetch('/api/progress', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            tutorialId: tutorial.id,
            currentStep: tutorial.steps.length,
            completed: true
          })
        })

        setIsCompleted(true)
        setCurrentStep(tutorial.steps.length)
      } catch (error) {
        console.error('Error marking complete:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tutorial Not Found</h1>
          <button
            onClick={() => router.push('/tutorials')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Tutorials
          </button>
        </div>
      </div>
    )
  }

  const currentStepData = tutorial.steps[currentStep]
  const progressPercentage = (currentStep / tutorial.steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <button
              onClick={() => router.push('/tutorials')}
              className="flex items-center space-x-3 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-lg shadow-sm border border-gray-200 hover:border-gray-300 transition-all duration-200 mb-4 group"
            >
              <svg 
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to All Tutorials</span>
            </button>
            
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">{tutorial.title}</h1>
              <button
                onClick={toggleBookmark}
                className={`text-2xl transition ${
                  isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                }`}
              >
                {isBookmarked ? '★' : '☆'}
              </button>
            </div>
            <p className="text-gray-600 text-lg mb-4">{tutorial.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {tutorial.platform}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {tutorial.difficulty}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {tutorial.estimatedTime} min
              </span>
              {isCompleted && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <span>✓</span>
                  <span>Completed</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {tutorial.steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Enhanced Step Content with Detailed Description */}
        <div className="space-y-6 mb-6">
          {/* Current Step Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Step {currentStep + 1}: {currentStepData?.title}
              </h2>
              <button
                onClick={() => setShowStepDetails(!showStepDetails)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <span>{showStepDetails ? '▲' : '▼'}</span>
                <span>{showStepDetails ? 'Hide Details' : 'Show Details'}</span>
              </button>
            </div>

            {showStepDetails && (
              <div className="space-y-6">
                {/* Detailed Description */}
                <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Detailed Instructions</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentStepData?.detailedDescription || currentStepData?.content}
                  </p>
                </div>

                {/* Helpful Tips */}
                {currentStepData?.tips && currentStepData.tips.length > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center space-x-2">
                      <span>💡</span>
                      <span>Helpful Tips</span>
                    </h3>
                    <ul className="space-y-2">
                      {currentStepData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2 text-yellow-700">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Video Section */}
                {currentStepData?.videoUrl && (
                  <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                    <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center space-x-2">
                      <span>🎥</span>
                      <span>Video Tutorial</span>
                    </h3>
                    <div className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center relative mb-4">
                      <div className="text-center text-white">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-700 transition cursor-pointer">
                          <span className="text-3xl">▶</span>
                        </div>
                        <p className="text-xl mb-2">Watch Step-by-Step Video</p>
                        <p className="text-gray-300 mb-4">Visual demonstration of this step</p>
                      </div>
                    </div>
                    <a 
                      href={currentStepData.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-semibold inline-block w-full text-center"
                    >
                      Open YouTube Tutorial
                    </a>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      <strong>Tip:</strong> The video will open in a new window. You can pause and rewind as needed.
                    </p>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Need More Help?</h4>
                    <p className="text-green-700 text-sm mb-3">
                      If you're still having trouble with this step, try these options:
                    </p>
                    <div className="space-y-2">
                      <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm">
                        Ask AI Assistant for Help
                      </button>
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                        Contact Support
                      </button>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Practice This Step</h4>
                    <p className="text-purple-700 text-sm mb-3">
                      Take your time to practice this step until you feel comfortable.
                    </p>
                    <div className="text-sm text-purple-600">
                      <p>• Expected time: {currentStepData?.duration} minutes</p>
                      <p>• You can revisit this step anytime</p>
                      <p>• No rush - learn at your own pace</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>

          <div className="flex space-x-4">
            {!isCompleted && (
              <button
                onClick={handleMarkComplete}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                Mark Complete
              </button>
            )}
            
            {currentStep < tutorial.steps.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={() => router.push('/tutorials')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Finish & Return to Tutorials
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Steps Overview - All steps are clickable */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Steps - Click any step to view</h3>
          <div className="space-y-3">
            {tutorial.steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start space-x-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-blue-100 border-2 border-blue-500 shadow-md'
                    : index < currentStep
                    ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    index === currentStep
                      ? 'bg-blue-500 text-white'
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-800">{step.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {step.content}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {step.duration} min
                    </span>
                    {step.videoUrl && (
                      <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded flex items-center space-x-1">
                        <span>🎥</span>
                        <span>Video Available</span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {index < currentStep && (
                    <span className="text-green-500 font-semibold bg-white rounded-full p-1">
                      ✓
                    </span>
                  )}
                  {index === currentStep && (
                    <span className="text-blue-500 font-semibold bg-white rounded-full p-1 animate-pulse">
                      ●
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Help Button for Mobile */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
          <button
            onClick={() => setShowStepDetails(!showStepDetails)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
            title="Toggle Step Details"
          >
            <span className="text-lg">{showStepDetails ? '▲' : '▼'}</span>
          </button>
          <button
            onClick={() => router.push('/tutorials')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
            title="Back to Tutorials"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}