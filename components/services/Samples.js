import { Heading, Grid, Image, AspectRatio } from "@chakra-ui/react"

const img1 = "/images/samples/1.jpg"
const img2 = "/images/samples/2.jpg"
const img3 = "/images/samples/3.jpg"
const img4 = "/images/samples/4.jpg"
const img5 = "/images/samples/5.jpg"
const img6 = "/images/samples/6.jpg"
const img7 = "/images/samples/7.jpg"
const img8 = "/images/samples/8.jpg"
const img9 = "/images/samples/9.jpg"
const img10 = "/images/samples/10.jpg"

export const Samples = () => {
  return (
    <>
      <Heading size="sm" my={4} color="gray.600">
        نمونه کارهای ما
      </Heading>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={4}
        w="full"
      >
        <AspectRatio ratio={1}>
          <Image src={img1} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img2} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img3} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img7} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img8} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img8} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img9} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img10} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img4} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img5} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img6} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img1} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img2} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img10} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img4} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img3} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img4} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img5} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img6} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img7} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img7} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img8} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img5} borderRadius={12} />
        </AspectRatio>
        <AspectRatio ratio={1}>
          <Image src={img7} borderRadius={12} />
        </AspectRatio>
      </Grid>
    </>
  )
}
