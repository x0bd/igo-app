import { YStack, XStack, Card, H1, H3, Button, Spacer } from '@tamagui/core'
import { Camera } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function Dashboard() {
  const router = useRouter()

  const handleScanPress = () => {
    router.push('/camera')
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" justifyContent="center" alignItems="center">
      <YStack maxWidth={600} width="100%" alignItems="center" gap="$6">
        {/* Hero Section */}
        <YStack alignItems="center" gap="$3">
          <H1 color="$cimasBlue" textAlign="center" fontSize="$10" fontWeight="700">
            Welcome to iGo
          </H1>
          <H3 color="$gray10" textAlign="center" fontSize="$6" fontWeight="400">
            Your AI-powered nutrition companion
          </H3>
        </YStack>

        <Spacer size="$4" />

        {/* Scan Card */}
        <Card
          elevate
          size="$6"
          bordered
          animation="bouncy"
          hoverStyle={{ scale: 0.98 }}
          pressStyle={{ scale: 0.96 }}
          width="100%"
          maxWidth={400}
          padding="$6"
          borderRadius="$4"
          backgroundColor="$background"
        >
          <YStack alignItems="center" gap="$4">
            <YStack
              width={120}
              height={120}
              borderRadius="$10"
              backgroundColor="$cimasBlue"
              alignItems="center"
              justifyContent="center"
              animation="bouncy"
            >
              <Camera size={60} color="#FFFFFF" strokeWidth={2} />
            </YStack>

            <Button
              size="$5"
              theme="blue"
              backgroundColor="$cimasBlue"
              color="white"
              borderRadius="$4"
              paddingHorizontal="$8"
              paddingVertical="$4"
              fontSize="$6"
              fontWeight="600"
              onPress={handleScanPress}
              pressStyle={{ opacity: 0.8 }}
              animation="bouncy"
            >
              Scan Your Meal
            </Button>
          </YStack>
        </Card>

        <Spacer size="$4" />

        {/* Empty State / Recent Scans Placeholder */}
        <Card
          size="$4"
          bordered
          width="100%"
          maxWidth={400}
          padding="$4"
          borderRadius="$4"
          backgroundColor="$gray2"
        >
          <YStack alignItems="center" gap="$2">
            <H3 color="$gray10" fontSize="$5" fontWeight="400">
              Recent Scans
            </H3>
            <H3 color="$gray8" fontSize="$4" fontWeight="300" textAlign="center">
              No scans yet. Start by scanning your first meal!
            </H3>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  )
}


