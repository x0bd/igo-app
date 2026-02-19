import { useState } from 'react'
import { YStack, XStack, Button, H2, Spinner, Text } from '@tamagui/core'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { ArrowLeft } from 'lucide-react-native'
import { MealService } from '../services/MealService'

export default function CameraScreen() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      setError('Camera permission is required to scan meals')
      return false
    }
    return true
  }

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions()
    if (!hasPermission) return

    setError(null)
    setIsAnalyzing(true)

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.9,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        
        // Analyze the meal
        const analysisResult = await MealService.analyzeMeal(imageUri)
        
        if (analysisResult.success && analysisResult.data) {
          // Navigate to results with data
          router.push({
            pathname: '/results',
            params: {
              imageUri,
              ...analysisResult.data,
            },
          })
        } else {
          setError(analysisResult.error || 'Failed to analyze meal')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while taking the photo')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handlePickFromLibrary = async () => {
    setError(null)
    setIsAnalyzing(true)

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.9,
      })

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri
        
        // Analyze the meal
        const analysisResult = await MealService.analyzeMeal(imageUri)
        
        if (analysisResult.success && analysisResult.data) {
          // Navigate to results with data
          router.push({
            pathname: '/results',
            params: {
              imageUri,
              ...analysisResult.data,
            },
          })
        } else {
          setError(analysisResult.error || 'Failed to analyze meal')
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while selecting the image')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4">
      {/* Header */}
      <XStack alignItems="center" gap="$3" marginBottom="$4">
        <Button
          size="$3"
          circular
          backgroundColor="$gray3"
          onPress={() => router.back()}
          pressStyle={{ opacity: 0.7 }}
        >
          <ArrowLeft size={24} color="#000000" />
        </Button>
        <H2 color="$cimasBlue" fontSize="$8" fontWeight="700">
          Scan Meal
        </H2>
      </XStack>

      <YStack flex={1} justifyContent="center" alignItems="center" gap="$6">
        {isAnalyzing ? (
          <YStack alignItems="center" gap="$4">
            <Spinner size="large" color="$cimasBlue" />
            <Text fontSize="$6" color="$gray10" fontWeight="500">
              Cimas iGo is analyzing your meal...
            </Text>
          </YStack>
        ) : (
          <>
            <YStack alignItems="center" gap="$4" width="100%" maxWidth={400}>
              <Button
                size="$6"
                backgroundColor="$cimasBlue"
                color="white"
                borderRadius="$4"
                paddingHorizontal="$8"
                paddingVertical="$5"
                fontSize="$7"
                fontWeight="600"
                onPress={handleTakePhoto}
                pressStyle={{ opacity: 0.8 }}
                animation="bouncy"
                width="100%"
              >
                Take Photo
              </Button>

              <Button
                size="$6"
                backgroundColor="$igoGreen"
                color="white"
                borderRadius="$4"
                paddingHorizontal="$8"
                paddingVertical="$5"
                fontSize="$7"
                fontWeight="600"
                onPress={handlePickFromLibrary}
                pressStyle={{ opacity: 0.8 }}
                animation="bouncy"
                width="100%"
              >
                Choose from Library
              </Button>
            </YStack>

            {error && (
              <YStack
                backgroundColor="$red2"
                padding="$4"
                borderRadius="$4"
                width="100%"
                maxWidth={400}
              >
                <Text color="$red10" fontSize="$5" textAlign="center">
                  {error}
                </Text>
              </YStack>
            )}
          </>
        )}
      </YStack>
    </YStack>
  )
}


