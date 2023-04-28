import * as React from "react"

// STYLING
import { styled, alpha } from "@mui/material/styles"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MailIcon from "@mui/icons-material/Mail"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MoreIcon from "@mui/icons-material/MoreVert"
import "./style.css"

// SWIPER JS
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper"

// ASSETS
import ycommerce from "../../assets/images/ycommerce-banner.jpeg"

// OTHERS
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "./slice"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(4),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
    },
  },
}))

export default function Home() {
  // const nav = useNavigate()
  const dispatch = useDispatch()

  const products = useSelector((state) => state.root.product)

  // USE EFFECT
  useEffect(() => {
    if (products.length === 0) {
      dispatch(actions.allProduct())
    } else {
      console.log(products)
    }
  }, [])

  // SWIPER
  const [swiperRef, setSwiperRef] = useState(null)

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#1e3d58" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, fontWeight: "bold" }}
          >
            Y-COMMERCE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      {/* BANNER  */}
      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          margin: "auto",
        }}
      >
        <Box
          sx={{
            height: { xs: "30vh", md: "50vh" },
            marginTop: { xs: "5vh", md: "15vh" },
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              height: "auto",
              marginRight: { xs: "0", md: "2%" },
            }}
          >
            <Swiper
              style={{
                "--swiper-pagination-color": "#eee",
              }}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="swiper-banner"
            >
              {[...new Array(5)].map(() => (
                <SwiperSlide>
                  <a href="https://github.com/Yuta4u">
                    <img src={ycommerce} className="main-banner" />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              justifyContent: "space-between",
              width: "30%",
              height: "auto",
            }}
          >
            {[...new Array(2)].map(() => (
              <Box
                sx={{
                  height: "46.5%",
                }}
              >
                <a href="https://github.com/Yuta4u">
                  <img src={ycommerce} className="child-banner" />
                </a>
              </Box>
            ))}
          </Box>
        </Box>

        {/* PRODUCTS  */}
        <Box
          className="product-div"
          sx={{
            marginLeft: { xs: "20px", md: "0" },
          }}
        >
          PRODUCT
        </Box>
        <Box className="products">
          <Swiper
            onSwiper={setSwiperRef}
            slidesPerView={5}
            // centeredSlides={true}
            breakpoints={{
              360: {
                slidesPerView: 3,
              },
              680: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
              1051: {
                slidesPerView: 5,
              },
            }}
            spaceBetween={5}
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="swiper-products"
          >
            {products.map(() => (
              <SwiperSlide className="swiper-product">
                <Box className="main-product">
                  <img
                    className="main-img-product"
                    src={
                      "https://cdn.idntimes.com/content-images/community/2022/02/gramicci-pants-review-best-relaxed-trousers-2df74cab14a794816f8530862347a9af-56ef617bd55ea9d3d17d407198a67575.jpg"
                    }
                  />
                  <Box className="main-produt-description">lel</Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  )
}
