import ChatBot from "react-chatbotify";
import botAvatar from "../src/assets/Avatar.webp"; 
import pompomHey from "../src/assets/Pom-Pom_Hey.webp"; 
import pompomPuzzled from "../src/assets/Pom-Pom_Puzzled.webp"; 
import pompomSparkle from "../src/assets/Pom-Pom_Sparkle.webp";


const MyChatBot = () => {
  
  const helpOptions = ["Events", "Socials"];
  const eventsOptions = ["Upcoming"];
  const socialsOptions = ["Website", "HoyoLab", "Discord", "Youtube", "Instagram", "Facebook", "TikTok", "WhatsApp"];

  const flow = {
    // Start
    start: {
      message: "<b>Hey, Trailblazer!</b>",
      transition: { duration: 1000 },
      path: "show_options",
    },
    
    // Show options
    show_options: {
      render: (
        <img className="fade-in stickers" src={pompomHey} alt="Pom-Pom Hey"/>
        ),
      options: helpOptions,
      path: "process_options"
    },

           // Events options
           events_options: {
            message: "Which event do you want to know about?",
            options: eventsOptions,
            path: "process_events"
          },

                 // Socials options
                 socials_options: {
                  options: socialsOptions,
                  path: "process_socials"
                },

    // Prompt again
    prompt_again: {
      render: (
        <img className="fade-in stickers" src={pompomSparkle} alt="Pom-Pom Puzzled"/>
        ),
      message: "Want to know anything more about?",
      options: helpOptions,
      path: "process_options"
    },

    // Unknown input
    unknown_input: {
      message: "Huh, what do you mean?!",
      render: (
        <img className="fade-in stickers" src={pompomPuzzled} alt="Pom-Pom Puzzled"/>
        ),
      options: helpOptions,
      path: "process_options"
    },

         // Events options
         process_events: {
          transition: { duration: 0 },
          chatDisabled: true,
          path: async (params:any) => {
              let message = "";
              switch (params.userInput) {
                  case "Upcoming":
                      message = `
                          <a href='https://www.hoyolab.com/article/28337682?utm_source=sns&utm_medium=link'>
                              <img src='../src/assets/events/DiscordEvent.webp' alt='Honkai: Star Rail Version 2.2 Discord Quest Stream Event' style='max-width: 100%; height: auto;' />
                          </a><p><b>Honkai: Star Rail Version 2.2 Discord Quest Stream Event</b><p>`;
        
                      break;
                  default:
                      return "unknown_input";
              }
              await params.injectMessage(message);
              return "repeat";
          },
      },      

       /* Hobbies options
       process_hobbies: {
        transition: { duration: 0 },
        chatDisabled: true,
        path: async (params:any) => {
            let message = "";
            switch (params.userInput) {
                case "Reading":
                    message = "They are a huge fan of <br>mystery novels 🕵️‍♂️ <br>You can find their book list on <a href='https://www.goodreads.com/linkthedev'>Goodreads</a>";
                    break;
                case "Gaming":
                    message = "They are a huge fan of Nintendo, turn-based RPGs & indie games! 🎮";
                    await params.injectMessage(message);
                    await params.injectMessage("Some of the games they like are: <br><ul><li>Ace Attorney</li><li>Honkai Star Rail</li><li>Mario</li></ul>");
                    return "repeat";
                default:
                    return "unknown_input";
            }
            await params.injectMessage(message);
            return "repeat";
        },
    }, */

    // Process options
    process_options: {
      transition: { duration: 0 },
      chatDisabled: true,
      path: async (params:any) => {
        let path = "";
        switch (params.userInput) {
          case "Events":
            path = "events_options";
            break;
            case "Socials":
              path = "socials_options";
              break;
          default:
            return "unknown_input";
        }
        return path;
      },
    },

     // Process options
    process_socials: {
      message: (params:any) => {
          let link = "";
          switch (params.userInput) {
          case "Website":
              link = "https://hsr.hoyoverse.com/";
              break;
          case "HoyoLab":
              link = "https://www.hoyolab.com/";
              break;
          case "Discord":
              link = "https://discord.com/invite/honkaistarrail";
              break;
              case "Youtube":
                link = "https://www.youtube.com/@HonkaiStarRail";
                break;
                case "Instagram":
                  link = "https://www.instagram.com/honkaistarrail/";
                  break;
                  case "Facebook":
                    link = "https://www.facebook.com/HonkaiStarRail/";
                    break;
                    case "TikTok":
                      link = "https://www.tiktok.com/@honkaistarrail_official";
                      break;
                      case "WhatsApp":
                        link = "https://api.whatsapp.com/send?phone=13109067251&text=Hi,%20Pom-Pom";
                        break;
          default:
              return "unknown_input";
          }
          setTimeout(() => {
              window.open(link);
          }, 1000)
          return `Sit tight! I'll send you to their ${params.userInput}!`;
      },
  transition: {duration: 1},
  path: "repeat"
},

    // Repeat
    repeat: {
      transition: { duration: 3000 },
      path: "prompt_again"
    },
  };

  return (
    <ChatBot
    options={{
      theme: { embedded: false 
      },
      notification: {
        disabled: false,
      },
      tooltip: {
        text: ">_<",
      },
      chatButton: {
        icon: botAvatar,
      },
      userBubble: { dangerouslySetInnerHtml: true },
      botBubble: { dangerouslySetInnerHtml: true },
      header: {
          title: (
            <h3 style={{margin: 0}}>Pom-Pom</h3>
        ),
        showAvatar: true,
        avatar: botAvatar,
      }
    }}
    flow={flow}
  />
  );
};

export default MyChatBot;
