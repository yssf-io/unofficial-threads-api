import axios from "axios";
import { Thread, User } from "./types";

export class Threads {
  async get(docId: string, userId: string) {
    const params = new URLSearchParams();
    params.append("doc_id", docId);
    params.append("variables", `{ userID: ${userId} }`);

    return (
      await axios.post("https://www.threads.net/api/graphql", params, {
        headers: {
          "X-Ig-App-Id": "238260118697367",
          "content-type": "application/x-www-form-urlencoded",
        },
      })
    ).data.data;
  }

  async user(userId: string): Promise<User> {
    const {
      is_private: isPrivate,
      profile_pic_url: profilePicUrl,
      username,
      hd_profile_pic_versions: hdProfilePicVersions,
      is_verified: isVerified,
      biography,
      briography_with_entities: biographyWithEntities,
      follower_count: followerCount,
      bio_links: bioLinks,
      pk,
      full_name: fullName,
      id,
    } = (await this.get("23996318473300828", userId)).userData.user;

    return {
      isPrivate,
      profilePicUrl,
      username,
      hdProfilePicVersions,
      isVerified,
      biography,
      biographyWithEntities,
      followerCount,
      bioLinks,
      pk,
      fullName,
      id,
    };
  }

  async threads(userId: string): Promise<Thread[]> {
    const threads = (await this.get("6232751443445612", userId)).mediaData
      .threads;

    return threads.map((thread: any) => {
      const { id, thread_items } = thread;
      const threadItems = thread_items.map((threadItem: any) => {
        const {
          user,
          image_versions2,
          caption,
          taken_at: takenAt,
          like_count: likeCount,
          pk,
          original_height: originalHeight,
          original_width: originalWidth,
        } = threadItem.post;

        const { text } = caption;
        const { candidates } = image_versions2;
        const {
          profile_pic_url: profilePicUrl,
          username,
          id,
          isVerified,
          pk: userPk,
        } = user;

        return {
          post: {
            user: { profilePicUrl, username, id, isVerified, pk: userPk },
            images: {
              candidates: candidates.map(({ height, width, url }: any) => {
                return { height, width, url };
              }),
            },
            caption: { text },
            takenAt,
            likeCount,
            pk,
            originalWidth,
            originalHeight,
          },
        };
      });

      return { id, threadItems };
    });
  }
}
