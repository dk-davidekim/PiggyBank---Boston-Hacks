from openai import OpenAI
from dotenv import load_dotenv
import os

# Load the environment variables
load_dotenv()

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def chat_with_gpt(item, description=None, model="gpt-3.5-turbo"):
    try:
        # Prepare the initial message about the item
        messages = [
            {"role": "system", "content": "You are a helpful assistant, knowledgeable about shopping, pricing, and providing specific recommendations."},
            {"role": "user", "content": f"I am a child planning to buy a {item}."}
        ]

        # Add a detailed description message and a prompt for a specific price recommendation
        if description:
            messages.append({"role": "user", "content": f"It should be like this: {description}"})
            messages.append({"role": "system", "content": f"Based on the description, provide a specific price recommendation for the {item}."})

        # Call the OpenAI API
        response = client.chat.completions.create(model=model, messages=messages)

        # Process the response
        if response.choices:
            choice = response.choices[0]
            if hasattr(choice, 'message') and hasattr(choice.message, 'content'):
                return choice.message.content
            else:
                return "Sorry, I couldn't process that response."
        else:
            return "No response received from the API."

    except Exception as e:
        print(f"An error occurred: {e}")
        return "Sorry, there was an error."

def main():
    print("Bot: What item are you planning to buy?")
    item = input("You: ")

    print(f"Bot: Please describe what kind of {item} you want to buy.")
    description = input("You: ")

    bot_response = chat_with_gpt(item, description)
    print("Bot:", bot_response)

if __name__ == "__main__":
    main()
