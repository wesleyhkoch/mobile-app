import React, { useEffect, useState } from "react"

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native"

import { COLOURS, Items } from "../database/Database"

import Entypo from "react-native-vector-icons/Entypo"

export const ProductInfo = ({ route, navigation }: any) => {
  const { productID } = route.params

  const [product, setProduct] = useState<any>([])

  const width = Dimensions.get("window").width

  const scrollX = new Animated.Value(0)

  let position = Animated.divide(scrollX, width)

  useEffect(() => {
    const unsubsribe = navigation.addListener("focus", () => {
      getDataFromDB()
    })

    return unsubsribe
  }, [navigation])

  const getDataFromDB = async () => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id == productID) {
        await setProduct(Items[i])
        return
      }
    }
  }

  const renderProduct = ({ item, index }: any) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    )
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar
        barStyle='dark-content'
        backgroundColor={COLOURS.backgroundLight}
      />
      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity>
              <Entypo
                name='chevron-left'
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList || null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.productImageList
              ? product.productImageList.map((data: any, index: any) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  })
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: "10%",
                        paddingLeft: 5,
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  )
                })
              : null}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
