document.addEventListener("DOMContentLoaded", () => {
  // Remove this SVG content block at the beginning of the file

  // DOM Elements
  const settingsBtn = document.getElementById("settings-btn")
  const settingsModal = document.getElementById("settings-modal")
  const scannerModal = document.getElementById("scanner-modal")
  const scanBtn = document.getElementById("scan-btn")
  const closeBtns = document.querySelectorAll(".close-btn")
  const themeToggle = document.getElementById("theme-toggle")
  const voiceBtn = document.getElementById("voice-btn")
  const listeningIndicator = document.getElementById("listening-indicator")
  const toggleApiVisibility = document.getElementById("toggle-api-visibility")
  const apiKeyInput = document.getElementById("api-key")
  const lgStatus = document.querySelector(".lg-status")
  const geminiStatus = document.querySelector(".gemini-status")

  // Initialize status indicators
  lgStatus.classList.add("disconnected")
  geminiStatus.classList.add("disconnected")

  // Open Settings Modal
  settingsBtn.addEventListener("click", () => {
    settingsModal.classList.add("show")
  })

  // Open Scanner Modal
  scanBtn.addEventListener("click", () => {
    settingsModal.classList.remove("show")
    setTimeout(() => {
      scannerModal.classList.add("show")
    }, 300)
  })

  // Close Modals
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      settingsModal.classList.remove("show")
      scannerModal.classList.remove("show")
    })
  })

  // Close Modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === settingsModal) {
      settingsModal.classList.remove("show")
    }
    if (e.target === scannerModal) {
      scannerModal.classList.remove("show")
    }
  })

  // Theme Toggle
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.remove("light-theme")
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-theme")
      document.body.classList.add("light-theme")
      localStorage.setItem("theme", "light")
    }
  })

  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.remove("light-theme")
    document.body.classList.add("dark-theme")
    themeToggle.checked = true
  }

  // Voice Button Activation
  voiceBtn.addEventListener("click", () => {
    voiceBtn.classList.add("active")
    listeningIndicator.classList.remove("listening-hidden")
    listeningIndicator.classList.add("listening-visible")

    // Simulate listening for 5 seconds
    setTimeout(() => {
      voiceBtn.classList.remove("active")
      listeningIndicator.classList.remove("listening-visible")
      listeningIndicator.classList.add("listening-hidden")
    }, 5000)
  })

  // Toggle API Key Visibility
  toggleApiVisibility.addEventListener("click", () => {
    if (apiKeyInput.type === "password") {
      apiKeyInput.type = "text"
      toggleApiVisibility.innerHTML = '<i class="fas fa-eye-slash"></i>'
    } else {
      apiKeyInput.type = "password"
      toggleApiVisibility.innerHTML = '<i class="fas fa-eye"></i>'
    }
  })

  // Update the connect button event handler to check all required fields
  document.querySelector(".connect-btn").addEventListener("click", () => {
    const username = document.getElementById("lg-username")
    const password = document.getElementById("lg-password")
    const ipInput = document.getElementById("lg-ip")
    const portInput = document.getElementById("lg-port")
    const rigsInput = document.getElementById("lg-rigs")

    if (
      username.value.trim() !== "" &&
      password.value.trim() !== "" &&
      ipInput.value.trim() !== "" &&
      portInput.value.trim() !== "" &&
      rigsInput.value.trim() !== ""
    ) {
      // Simulate connection
      lgStatus.classList.remove("disconnected")
      lgStatus.classList.add("connected")

      // Show success message
      showNotification("Connected to Liquid Galaxy successfully!", "success")

      // Close modal
      settingsModal.classList.remove("show")
    } else {
      showNotification("Please fill in all required fields", "error")
    }
  })

  // Validate API Key (Simulation)
  document.querySelector(".save-api-btn").addEventListener("click", () => {
    const apiKey = document.getElementById("api-key").value

    if (apiKey.trim() !== "") {
      // Simulate validation
      geminiStatus.classList.remove("disconnected")
      geminiStatus.classList.add("connected")

      // Show success message
      showNotification("Gemini API key validated successfully!", "success")

      // Save API key (in a real app, use secure storage)
      localStorage.setItem("geminiApiKey", apiKey)
    } else {
      showNotification("Please enter a valid API key", "error")
    }
  })

  // Notification System
  function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
      </div>
    `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.classList.add("show")
    }, 10)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, 3000)
  }

  // Load saved API key if exists
  const savedApiKey = localStorage.getItem("geminiApiKey")
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey
    geminiStatus.classList.remove("disconnected")
    geminiStatus.classList.add("connected")
  }

  // Add pulse animation to voice button
  const pulseRing = document.querySelector(".pulse-ring")
  voiceBtn.addEventListener("mouseenter", () => {
    pulseRing.style.opacity = "0.7"
    pulseRing.style.animation = "pulse 2s infinite"
  })

  voiceBtn.addEventListener("mouseleave", () => {
    if (!voiceBtn.classList.contains("active")) {
      pulseRing.style.opacity = "0"
      pulseRing.style.animation = "none"
    }
  })
})

