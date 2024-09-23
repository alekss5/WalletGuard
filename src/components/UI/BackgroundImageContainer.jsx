import { ImageBackground, StyleSheet } from 'react-native'
import background from '../../../assets/bg.jpeg'

export default function BackgroundImageContainer({ children }) {
    return (
        <ImageBackground source={background} style={styles.background} imageStyle={styles.image} resizeMode="cover" >
            {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1, overflow: 'hidden'
    },
    image: {
        opacity: 0.1
    }
})